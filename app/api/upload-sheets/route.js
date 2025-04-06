import { google } from 'googleapis'
import { BigQuery } from '@google-cloud/bigquery'
import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function POST(req, res) {
    try {
        const body = await req.json()
        const { questionTable, categoryTable, goalTable, surveyData } = body

        const keyFilePath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)

        if (!fs.existsSync(keyFilePath)) {
            return NextResponse.json({ error: 'Service account key not found' }, { status: 500 })
        }

        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        })

        const sheets = google.sheets({ version: 'v4', auth })

        // Function to extract spreadsheetId from URL
        const extractId = (url) => {
            const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
            return match ? match[1] : ''
        }

        const getSheetData = async (url) => {
            const spreadsheetId = extractId(url)
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: 'A1:Z1000',
            })

            const [headers, ...rows] = response.data.values
            return rows.map(row => {
                const obj = {}
                headers.forEach((header, i) => {
                    obj[header] = row[i] || ''
                })
                return obj
            })
        }

        const questionData = await getSheetData(questionTable)
        const categoryData = (await getSheetData(categoryTable)).map(category => ({
            ...category,
            question_ids: category.question_ids
                ? category.question_ids.split(',').map(id => id.trim())
                : [],
        }))
        const goalData = (await getSheetData(goalTable)).map(goal => ({
            ...goal,
            category_ids: goal.category_ids
                ? goal.category_ids.split(',').map(id => id.trim())
                : [],
        }))

        const bigquery = new BigQuery({
            keyFilename: keyFilePath,
            projectId: process.env.GCP_PROJECT_ID,
        })

        const datasetId = 'smartgap_dataset'

        async function ensureTableExists(datasetId, tableId, schema) {
            const [tables] = await bigquery.dataset(datasetId).getTables()
            const tableNames = tables.map(t => t.id)

            if (!tableNames.includes(tableId)) {
                console.log(`Creating table ${tableId}...`)
                await bigquery.dataset(datasetId).createTable(tableId, { schema })
                await new Promise(res => setTimeout(res, 1000))
                console.log(`Table ${tableId} created.`)
            }
        }

        await ensureTableExists('smartgap_dataset', 'questions', [
            { name: 'question_id', type: 'STRING' },
            { name: 'question_name', type: 'STRING' }
        ])

        await ensureTableExists('smartgap_dataset', 'categories', [
            { name: 'category_id', type: 'STRING' },
            { name: 'category_name', type: 'STRING' },
            { name: 'question_ids', type: 'STRING', mode: 'REPEATED' }
        ])

        await ensureTableExists('smartgap_dataset', 'goals', [
            { name: 'goal_id', type: 'STRING' },
            { name: 'goal_name', type: 'STRING' },
            { name: 'category_ids', type: 'STRING', mode: 'REPEATED' }
        ])

        console.log(JSON.stringify(questionData, null, 2))

        try {
            await bigquery.dataset(datasetId).table('questions').insert(questionData)
            await bigquery.dataset(datasetId).table('categories').insert(categoryData)
            await bigquery.dataset(datasetId).table('goals').insert(goalData)

        } catch (err) {
            console.error('Cannot insert data:', err)
            return NextResponse.json({ error: 'Cannot insert data' }, { status: 500 })
        }

        const [rows] = await bigquery.query({
            query: `
           WITH category_question AS (
            SELECT
                c.category_id,
                c.category_name,
                STRING_AGG(q.question_id ORDER BY q.question_id) AS question_ids
            FROM
                ${process.env.GCP_PROJECT_ID}.${datasetId}.categories c
            JOIN
                ${process.env.GCP_PROJECT_ID}.${datasetId}.questions q
                ON c.category_id = q.category_id
            GROUP BY
                c.category_id, c.category_name
            )

            SELECT
            g.goal_id,
            g.goal_name,
            cq.category_id,
            cq.category_name,
            cq.question_ids
            FROM
            ${process.env.GCP_PROJECT_ID}.${datasetId}.goals g
            JOIN
            category_question cq
            ON g.goal_id = cq.category_id  -- Fixing this line: you need to join goal_id and category_id if that's the relationship
            ORDER BY
            g.goal_id;
        `,
            location: 'EU',
        })

        console.log('Query executed, rows:', rows)

        return NextResponse.json(rows)

    } catch (err) {
        console.error('Error reading sheets:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}