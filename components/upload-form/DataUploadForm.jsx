'use client'
import React, { useEffect, useState } from 'react'
import './DataUploadForm.css'
import KeyTables from '../key-tables/KeyTables'
import SurveyData from '../survey-data/surveyData'
import axios from 'axios'

export default function DataUploadForm() {

    const [tables, setTables] = useState({
        questionTable: "",
        categoryTable: "",
        goalTable: "",
        objectiveTable: "",
        surveyData: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [combinedData, setCombinedData] = useState(null)
    const [surveyDataLoadingStatus, setSurveyDataLoadingStatus] = useState(null)
    const [dataAnalysisStatus, setDataAnalysisStatus] = useState(null)
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        const dataSource = e.target.name
        const link = e.target.value
        setTables({ ...tables, [dataSource]: link })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setProgress(0)

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 80
                        setProgress(percentComplete)
                    }
                },
            }

            const response = await axios.post('/api/upload-sheets', {
                questionTable: tables.questionTable,
                categoryTable: tables.categoryTable,
                goalTable: tables.goalTable,
                objectiveTable: tables.objectiveTable,
                surveyData: tables.surveyData,
            }, config);

            setProgress(90);
            setTimeout(() => {
                setProgress(100) // final step
                setTimeout(() => {
                    setCombinedData(response.data)
                    setIsLoading(false)
                }, 300)// after progress reaches 100%
            }, 300)

        } catch (error) {
            console.error('Upload failed:', error)
        }
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
        <section className="files rtl-text">

            <div className="form-container">
                <h2 className="feature-text">העלאת קבצים</h2>
                <svg className="folder-shape" viewBox="0 0 1370 809" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 8.00001C0.5 3.85788 3.85787 0.5 8 0.5H1094.91C1097.05 0.5 1099.09 1.4161 1100.51 3.01723L1130.58 36.8457C1132.2 38.6603 1134.51 39.6986 1136.94 39.6986H1362C1366.14 39.6986 1369.5 43.0564 1369.5 47.1986V801C1369.5 805.142 1366.14 808.5 1362 808.5H7.99999C3.85785 808.5 0.5 805.142 0.5 801V8.00001Z" stroke="#CCCCCC" />
                </svg>

                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="tables-section">
                        <KeyTables tables={tables} handleChange={handleChange} data={combinedData} />
                        {!combinedData && <button type="submit" className="btn load-btn"><span>טעינת קבצי מפתחות</span></button>}
                    </div>

                    {isLoading && (
                        <div style={{ marginTop: '1rem', width: '100%', background: '#eee', height: '8px', borderRadius: '4px' }}>
                            <div
                                style={{
                                    width: `${progress}%`,
                                    height: '100%',
                                    backgroundColor: '#4caf50', // green
                                    transition: 'width 0.3s ease',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>
                    )}

                    <div className="survey-data-section">
                        <SurveyData surveyData={tables.surveyData} handleChange={handleChange} surveyDataLoadingStatus={surveyDataLoadingStatus} />
                        {!surveyDataLoadingStatus && <button type="button" className="btn load-btn" onClick={handleSubmitSurveyData}><span>טעינת הקובץ</span></button>}
                    </div>

                    {combinedData && surveyDataLoadingStatus && (<button className="btn load-btn" onClick={analyzeData}>ביצוע ניתוח נתונים</button>)}
                </form>
            </div>
        </section>
    )

}