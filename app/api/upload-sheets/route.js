import { google } from 'googleapis'
import { BigQuery } from '@google-cloud/bigquery'
import { NextResponse } from 'next/server'
import { getSheetDataFromUrl } from '../../utils/sheets-utils'
import { ensureTableExists } from '../../utils/bigquery-utils'
import path from 'path'
import fs from 'fs'

export async function POST(req, res) {
    try {
        const body = await req.json()
        const { questionTable, categoryTable, goalTable, objectiveTable, surveyData } = body

        const keyFilePath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)

        if (!fs.existsSync(keyFilePath)) {
            return NextResponse.json({ error: 'Service account key not found' }, { status: 500 })
        }

        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        })

        const sheets = google.sheets({ version: 'v4', auth })

        const questionData = await getSheetDataFromUrl(questionTable, sheets)
        const categoryData = (await getSheetDataFromUrl(categoryTable, sheets)).map(category => ({
            ...category,
            question_ids: category.question_ids
                ? category.question_ids.split(',').map(id => id.trim())
                : [],
        }))
        const goalData = (await getSheetDataFromUrl(goalTable, sheets)).map(goal => ({
            ...goal,
            category_ids: goal.category_ids
                ? goal.category_ids.split(',').map(id => id.trim())
                : [],
        }))
        const objectiveData = (await getSheetDataFromUrl(objectiveTable, sheets)).map(objective => ({
            ...objective,
            goal_ids: objective.goal_ids
                ? objective.goal_ids.split(',').map(id => id.trim())
                : [],
        }))
        console.log('goalData', goalData)
        console.log('objectiveData', objectiveData)

        const bigquery = new BigQuery({
            keyFilename: keyFilePath,
            projectId: process.env.GCP_PROJECT_ID,
        })

        const datasetId = 'smartgap_dataset'

        await ensureTableExists(bigquery, 'smartgap_dataset', 'questions', [
            { name: 'question_id', type: 'STRING' },
            { name: 'question_name', type: 'STRING' }
        ])

        await ensureTableExists(bigquery, 'smartgap_dataset', 'categories', [
            { name: 'category_id', type: 'STRING' },
            { name: 'category_name', type: 'STRING' },
            { name: 'question_ids', type: 'STRING', mode: 'REPEATED' }
        ])

        await ensureTableExists(bigquery, 'smartgap_dataset', 'goals', [
            { name: 'goal_id', type: 'STRING' },
            { name: 'goal_name', type: 'STRING' },
            { name: 'category_ids', type: 'STRING', mode: 'REPEATED' }
        ])

        await ensureTableExists(bigquery, 'smartgap_dataset', 'objectives', [
            { name: 'objective_id', type: 'STRING' },
            { name: 'objective_name', type: 'STRING' },
            { name: 'goal_ids', type: 'STRING', mode: 'REPEATED' }
        ])

        try {
            await bigquery.dataset(datasetId).table('questions').insert(questionData)
            await bigquery.dataset(datasetId).table('categories').insert(categoryData)
            await bigquery.dataset(datasetId).table('goals').insert(goalData)
            await bigquery.dataset(datasetId).table('objectives').insert(objectiveData)

        } catch (err) {
            console.error('Cannot insert data:', err)
            return NextResponse.json({ error: 'Cannot insert data' }, { status: 500 })
        }

        const categoriesTable = `${datasetId}.categories`
        const goalsTable = `${datasetId}.goals`
        const objectivesTable = `${datasetId}.objectives`

        const [rows] = await bigquery.query({
            query: `
           WITH category_expanded AS (
            SELECT
                category_id,
                category_name,
                question_id
       FROM
        \`${categoriesTable}\`,
        UNNEST(question_ids) AS question_id
            ),

            goal_expanded AS (
            SELECT
                g.goal_id,
                g.goal_name,
                c.category_id,
                c.category_name,
                c.question_id
            FROM
        \`${goalsTable}\` g,
                UNNEST(g.category_ids) AS category_id
            JOIN category_expanded c
                USING (category_id)
            )

            SELECT
            goal_name AS goal,
            goal_id,
            category_name AS category,
            category_id,
            STRING_AGG(DISTINCT question_id, ', ' ORDER BY question_id) AS question_ids
            FROM
            goal_expanded
            GROUP BY
            goal, goal_id, category, category_id
            ORDER BY
            goal_id, category_id;
        `,
            location: 'EU',
        })

        return NextResponse.json(rows)

    } catch (err) {
        console.error('Error reading sheets:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}