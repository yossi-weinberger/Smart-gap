'use client'
import React, { useEffect, useState } from 'react'
import './DataUploadForm.css'
import DataPreview from '../data-preview/DataPreview'
import Loading from '../loading/loading'
import KeyTables from '../key-tables/KeyTables'
import SurveyData from '../survey-data/surveyData'

export default function DataUploadForm() {

    const [isLoading, setIsLoading] = useState(false)
    const [tables, setTables] = useState({
        questionTable: "",
        categoryTable: "",
        goalTable: "",
        surveyData: ""
    })
    // const [surveyData, setSurveyData] = useState('')

    const [data, setData] = useState(null)

    const handleChange = (e) => {
        const dataSource = e.target.name
        const link = e.target.value
        // if (dataSource === 'surveyData') setSurveyData(link)
        setTables({ ...tables, [dataSource]: link })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await fetch('/api/upload-sheets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                questionTable: tables.questionTable,
                categoryTable: tables.categoryTable,
                goalTable: tables.goalTable,
                surveyData: tables.surveyData,
            })
        })
        const data = await res.json()
        console.log('Data from backend:', data)
        setData(data)
        setIsLoading(false)
        // onSubmit(data)
    }

    if (data) {
        return <DataPreview data={data} />
    }

    return (
        <>
            {(isLoading) ? <Loading /> :
                <form onSubmit={handleSubmit} className="upload-form">
                    <div>
                        <KeyTables tables={tables} handleChange={handleChange} />
                        <button type="submit" className="btn load-btn"><span>טעינת קבצי מפתחות</span></button>
                    </div>

                    <div>
                        <SurveyData surveyData={tables.surveyData} handleChange={handleChange} />
                        <button type="button" className="btn load-btn"><span>טעינת הקובץ</span></button>
                    </div>
                </form>
            }
        </>
    )

}