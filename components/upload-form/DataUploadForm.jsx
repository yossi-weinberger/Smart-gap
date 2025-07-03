'use client'
import React, { useState } from 'react'
import './DataUploadForm.css'
import KeyTables from '../key-tables/KeyTables'
import SurveyData from '../survey-data/SurveyData'
import { dataService } from '@/services/dataService'

export default function DataUploadForm() {

    const [surveyData, setSurveyData] = useState('')
    const [tables, setTables] = useState({
        questionTable: "",
        categoryTable: "",
        goalTable: "",
        objectiveTable: "",
    })
    const [combinedData, setCombinedData] = useState(null)
    const [isLoadingTables, setIsLoadingTables] = useState({ isLoading: false, progress: 0 })
    const [isLoadingSurveyData, setIsLoadingSurveyData] = useState({ isLoading: false, progress: 0 })
    const [surveyDataLoadingStatus, setSurveyDataLoadingStatus] = useState(null)
    const [dataAnalysisStatus, setDataAnalysisStatus] = useState(null)

    const handleChange = (e, type = null) => {
        const dataSource = e.target.name
        const link = e.target.value
        if (type === 'survey') setSurveyData(link)
        else setTables({ ...tables, [dataSource]: link })
    }

    const handleSubmit = async ({
        e,
        setLoadingState,
        uploadFunction,
        uploadPayload,
        onSuccess,
    }) => {
        e.preventDefault()
        setLoadingState({ progress: 10, isLoading: true })

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 80
                        setLoadingState(prev => ({ ...prev, progress: percentComplete }))
                    }
                },
            }

            const response = await uploadFunction(uploadPayload, config)
            setLoadingState(prev => ({ ...prev, progress: 90 }))

            setTimeout(() => {
                setLoadingState(prev => ({ ...prev, progress: 100 }))

                setTimeout(() => {
                    onSuccess(response.data)
                    setLoadingState({ progress: 0, isLoading: false })
                }, 300)
            }, 300)

        } catch (error) {
            console.error('Upload failed:', error)
        }
    }

    const handleSubmitTables = (e) => {
        handleSubmit({
            e,
            setLoadingState: setIsLoadingTables,
            uploadFunction: dataService.uploadFiles,
            uploadPayload: tables,
            onSuccess: (data) => setCombinedData(data),
        })
    }

    const handleSubmitSurveyData = (e) => {
        handleSubmit({
            e,
            setLoadingState: setIsLoadingSurveyData,
            uploadFunction: dataService.uploadSurveyData,
            uploadPayload: { surveyData },
            onSuccess: (data) => {
                setSurveyDataLoadingStatus(data)
                console.log('Data from backend:', data)
            },
        })
    }

    const analyzeData = async (e) => {
        e.preventDefault()

        try {
            const res = await dataService.analyzeData()
            const status = await res.json()
            console.log('Data from backend:', status)
            setDataAnalysisStatus(status)
        } catch (error) {
            console.error('Can not analyze data:', error)
        }
    }

    const clearTablesForm = () => {
        setCombinedData(null)
        setTables({
            questionTable: "",
            categoryTable: "",
            goalTable: "",
            objectiveTable: "",
        })
    }

    const clearSurveyForm = () => {
        setSurveyData('')
        setSurveyDataLoadingStatus(null)
    }

    return (
        <section className="files rtl-text">
            <div className="form-container">
                <h2 className="feature-text">העלאת קבצים</h2>
                <svg className="folder-shape" viewBox="0 0 1370 809" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 8.00001C0.5 3.85788 3.85787 0.5 8 0.5H1094.91C1097.05 0.5 1099.09 1.4161 1100.51 3.01723L1130.58 36.8457C1132.2 38.6603 1134.51 39.6986 1136.94 39.6986H1362C1366.14 39.6986 1369.5 43.0564 1369.5 47.1986V801C1369.5 805.142 1366.14 808.5 1362 808.5H7.99999C3.85785 808.5 0.5 805.142 0.5 801V8.00001Z" stroke="#CCCCCC" />
                </svg>

                <div className="forms">
                    <div className="form-header questionnaire-name-section">
                        <h3 className="form-headline rtl-text"> שם השאלון</h3>
                        <p className="description rtl-text">   כל הקבצים יישמרו תחת שם זה. (לדוגמא: מקצה א׳ 2025)</p>
                        <input className="link-input" type="text" name='' placeholder='כתבו את שם השאלון' value='' onChange={handleChange} required />
                    </div>

                    <KeyTables
                        tables={tables}
                        handleChange={handleChange}
                        data={combinedData}
                        clearTablesForm={clearTablesForm}
                        onSubmit={handleSubmitTables}
                        isLoadingTables={isLoadingTables}
                    />

                    <SurveyData surveyData={surveyData}
                        handleChange={handleChange}
                        surveyDataLoadingStatus={surveyDataLoadingStatus}
                        clearSurveyForm={clearSurveyForm}
                        onSubmit={handleSubmitSurveyData}
                        isLoadingSurveyData={isLoadingSurveyData}
                    />

                    {combinedData && surveyDataLoadingStatus && (
                        <div className="analyze-data-btn-container">
                            <button className="btn load-btn analyze-data-btn" onClick={analyzeData}>ביצוע ניתוח נתונים</button>
                        </div>)}
                </div>
            </div>
        </section>
    )

}