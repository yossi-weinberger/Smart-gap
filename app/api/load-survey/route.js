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
        const { surveyData } = body

        const keyFilePath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)

        if (!fs.existsSync(keyFilePath)) {
            return NextResponse.json({ error: 'Service account key not found' }, { status: 500 })
        }

        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        })

        const sheets = google.sheets({ version: 'v4', auth })

        const dataFromSurvey = await getSheetDataFromUrl(surveyData, sheets)

        const bigquery = new BigQuery({
            keyFilename: keyFilePath,
            projectId: process.env.GCP_PROJECT_ID,
        })

        const datasetId = 'smartgap_dataset'

        const demographicsCols = ['d101', 'd102', 'd103', 'd104', 'd105', 'd106', 'd107', 'd108']
        const answerPrefixRegex = /^d\d{3}$/  // matches all d### fields

        await ensureTableExists(bigquery, datasetId, 'demographic_responses', [
            { name: 'user_id', type: 'STRING' },
            ...demographicsCols.map(col => ({ name: col, type: 'STRING' }))
        ])

        await ensureTableExists(bigquery, datasetId, 'survey_answers_long', [
            { name: 'user_id', type: 'STRING' },
            { name: 'question_id', type: 'STRING' },
            { name: 'answer', type: 'FLOAT64' }
        ])

        const demographicRows = []
        const answerRows = []

        // console.log('dataFromSurvey', dataFromSurvey[0])

        dataFromSurvey.forEach((entry, i) => {
            const demographics = { user_id: i }

            for (const [key, value] of Object.entries(entry)) {
                if (key === 'user_id') continue

                if (demographicsCols.includes(key)) {
                    demographics[key] = value?.toString().trim() || null
                }

                else if (answerPrefixRegex.test(key)) {
                    const numericValue = parseFloat(value)
                    if (!isNaN(numericValue)) {
                        answerRows.push({
                            user_id: i,
                            question_id: key,
                            answer: numericValue
                        })
                    }
                }
            }
            demographicRows.push(demographics)
        })

        try {
            if (demographicRows.length) {
                await bigquery.dataset(datasetId).table('demographic_responses').insert(demographicRows)
            }
            if (answerRows.length) {
                await bigquery.dataset(datasetId).table('survey_answers_long').insert(answerRows)
            }

            return NextResponse.json({ status: 'הקובץ הועלה בהצלחה' })
        } catch (err) {
            console.error('Error inserting data into BigQuery:', err)
            return NextResponse.json({ error: 'Failed to insert into one or more tables' }, { status: 500 })
        }


    } catch (err) {
        console.error('Error reading sheets:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}