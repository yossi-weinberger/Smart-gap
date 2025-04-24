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

    const [combinedData, setCombinedData] = useState(null)
    const [surveyDataLoadingStatus, setSurveyDataLoadingStatus] = useState(null)
    const [dataAnalysisStatus, setDataAnalysisStatus] = useState(null)

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
        setCombinedData(data)
        setIsLoading(false)
    }

    const handleSubmitSurveyData = async (e) => {
        e.preventDefault()
        // setIsLoading(true)
        const res = await fetch('/api/load-survey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                surveyData: tables.surveyData,
            })
        })
        const status = await res.json()
        console.log('Data from backend:', status)
        setSurveyDataLoadingStatus(status)
        // setIsLoading(false)
    }

    const analyzeData = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/calculate-goal-averages', {
            method: 'POST',
        })
        const status = await res.json()
        console.log('Data from backend:', status)
        setDataAnalysisStatus(status)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="tables-section">
                    <KeyTables tables={tables} handleChange={handleChange} data={combinedData} />
                    {!combinedData && <button type="submit" className="btn load-btn"><span>טעינת קבצי מפתחות</span></button>}
                </div>

                <div className="survey-data-section">
                    <SurveyData surveyData={tables.surveyData} handleChange={handleChange} surveyDataLoadingStatus={surveyDataLoadingStatus} />
                    {!surveyDataLoadingStatus && <button type="button" className="btn load-btn" onClick={handleSubmitSurveyData}><span>טעינת הקובץ</span></button>}
                </div>

                {combinedData && surveyDataLoadingStatus && (<button className="btn load-btn" onClick={analyzeData}>ביצוע ניתוח נתונים</button>)}
            </form>
        </>
    )

}