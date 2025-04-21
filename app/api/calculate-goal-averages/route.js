import { BigQuery } from '@google-cloud/bigquery'
import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'

export async function POST() {

    const keyFilePath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)

    if (!fs.existsSync(keyFilePath)) {
        return NextResponse.json({ error: 'Service account key not found' }, { status: 500 })
    }

    const bigquery = new BigQuery({
        keyFilename: keyFilePath,
        projectId: process.env.GCP_PROJECT_ID,
    })

    const datasetId = 'smartgap_dataset'

    await bigquery.query({
        query: `
        CREATE OR REPLACE TABLE \`${datasetId}.goal_averages\` AS
        
        WITH
        -- Step 1: Parse JSON into flat key-value pairs
        flattened_survey AS (
        SELECT
            JSON_EXTRACT_SCALAR(data, '$.d109') AS d109,
            JSON_EXTRACT_SCALAR(data, '$.d110') AS d110,
            JSON_EXTRACT_SCALAR(data, '$.d111') AS d111,
            JSON_EXTRACT_SCALAR(data, '$.d112') AS d112,
            JSON_EXTRACT_SCALAR(data, '$.d113') AS d113,
            JSON_EXTRACT_SCALAR(data, '$.d114') AS d114,
            JSON_EXTRACT_SCALAR(data, '$.d115') AS d115,
            JSON_EXTRACT_SCALAR(data, '$.d116') AS d116,
            JSON_EXTRACT_SCALAR(data, '$.d117') AS d117,
            JSON_EXTRACT_SCALAR(data, '$.d118') AS d118,
            JSON_EXTRACT_SCALAR(data, '$.d119') AS d119,
            JSON_EXTRACT_SCALAR(data, '$.d120') AS d120,
            JSON_EXTRACT_SCALAR(data, '$.d121') AS d121,
            JSON_EXTRACT_SCALAR(data, '$.d122') AS d122,
            JSON_EXTRACT_SCALAR(data, '$.d123') AS d123,
            JSON_EXTRACT_SCALAR(data, '$.d124') AS d124,
            JSON_EXTRACT_SCALAR(data, '$.d125') AS d125,
            JSON_EXTRACT_SCALAR(data, '$.d126') AS d126
        FROM
            \`${datasetId}.survey_responses\`
        ),

        -- Step 2: Unpivot the survey responses to rows of (question_id, answer)
        unpivoted AS (
        SELECT
            u.question_id,
            SAFE_CAST(u.score AS FLOAT64) AS score
        FROM
            flattened_survey,
            UNNEST([
            STRUCT('d109' AS question_id, d109 AS score),
            STRUCT('d110', d110),
            STRUCT('d111', d111),
            STRUCT('d112', d112),
            STRUCT('d113', d113),
            STRUCT('d114', d114),
            STRUCT('d115', d115),
            STRUCT('d116', d116),
            STRUCT('d117', d117),
            STRUCT('d118', d118),
            STRUCT('d119', d119),
            STRUCT('d120', d120),
            STRUCT('d121', d121),
            STRUCT('d122', d122),
            STRUCT('d123', d123),
            STRUCT('d124', d124),
            STRUCT('d125', d125),
            STRUCT('d126', d126)
            ]) AS u
        ),

        -- Step 3: Expand goals and categories
        combined_table AS (
        WITH category_expanded AS (
            SELECT
            category_id,
            category_name,
            question_id
            FROM
            \`${datasetId}.categories\`,
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
            \`${datasetId}.goals\` g,
            UNNEST(g.category_ids) AS category_id
            JOIN category_expanded c
            USING (category_id)
        )
        SELECT
            goal_id,
            goal_name,
            question_id
        FROM
            goal_expanded
        ),

        -- Step 4: Join to get scores per goal
        joined AS (
        SELECT
            c.goal_id,
            c.goal_name,
            u.score
        FROM
            combined_table c
        JOIN
            unpivoted u
        ON
            c.question_id = u.question_id
        )

        SELECT
        goal_id,
        goal_name,
        ROUND(AVG(score), 2) AS average_score
        FROM
        joined
        WHERE
        score IS NOT NULL
        GROUP BY
        goal_id,
        goal_name
        ORDER BY
        goal_id
        `,
        location: 'EU',
    })

    return NextResponse.json({ status: 'בוצע ניתוח נתונים' })

}