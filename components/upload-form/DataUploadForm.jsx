'use client'
import React, { useEffect, useState } from 'react'
import './DataUploadForm.css'
import KeyTables from '../key-tables/KeyTables'
import SurveyData from '../survey-data/surveyData'
import { dataService } from '@/services/dataService'
import { LoaderBar } from '../loader-bar/LoaderBar'

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

    const handleSubmitTables = async (e) => {
        e.preventDefault()
        setIsLoadingTables({ progress: 10, isLoading: true })

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 80
                        setIsLoadingTables(prev => ({ ...prev, progress: percentComplete }))
                    }
                },
            }

            const response = await dataService.uploadFiles(tables, config)
            setIsLoadingTables(prev => ({ ...prev, progress: 90 }))

            setTimeout(() => {
                setIsLoadingTables(prev => ({ ...prev, progress: 100 })) // final step

                setTimeout(() => {
                    setCombinedData(response.data)
                    setIsLoadingTables({ progress: 0, isLoading: false })
                }, 300)// after progress reaches 100%
            }, 300)

        } catch (error) {
            console.error('Upload failed:', error)
        }
    }

    const handleSubmitSurveyData = async (e) => {
        e.preventDefault()
        setIsLoadingSurveyData({ progress: 10, isLoading: true })

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 80
                        setIsLoadingSurveyData(prev => ({ ...prev, progress: percentComplete }))
                    }
                },
            }
            const res = await dataService.uploadSurveyData({ surveyData: surveyData }, config)
            setIsLoadingSurveyData(prev => ({ ...prev, progress: 90 }))

            setTimeout(() => {
                setIsLoadingSurveyData(prev => ({ ...prev, progress: 100 })) // final step

                setTimeout(() => {
                    setSurveyDataLoadingStatus(res.data)
                    console.log('Data from backend:', res.data)
                    setIsLoadingSurveyData({ progress: 0, isLoading: false })
                }, 300)// after progress reaches 100%
            }, 300)
        } catch (error) {
            console.error('Survey data upload failed:', error)
        }
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

    return (
        <section className="files rtl-text">

            <div className="form-container">
                <h2 className="feature-text">העלאת קבצים</h2>
                <svg className="folder-shape" viewBox="0 0 1370 809" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 8.00001C0.5 3.85788 3.85787 0.5 8 0.5H1094.91C1097.05 0.5 1099.09 1.4161 1100.51 3.01723L1130.58 36.8457C1132.2 38.6603 1134.51 39.6986 1136.94 39.6986H1362C1366.14 39.6986 1369.5 43.0564 1369.5 47.1986V801C1369.5 805.142 1366.14 808.5 1362 808.5H7.99999C3.85785 808.5 0.5 805.142 0.5 801V8.00001Z" stroke="#CCCCCC" />
                </svg>

                <form onSubmit={handleSubmitTables} className="upload-form">
                    <div className="tables-section">
                        <KeyTables tables={tables} handleChange={handleChange} data={combinedData} clearTablesForm={clearTablesForm} />
                        {!combinedData && <button type="submit" className="btn load-btn"><span>טעינת קבצי מפתחות</span></button>}
                    </div>

                    {!!isLoadingTables.progress &&
                        <LoaderBar progress={isLoadingTables.progress} />
                    }
                </form>

                <form className="upload-form" onSubmit={handleSubmitSurveyData}>
                    <div className="survey-data-section">
                        <SurveyData surveyData={surveyData} handleChange={handleChange} surveyDataLoadingStatus={surveyDataLoadingStatus} />
                        {!surveyDataLoadingStatus &&
                            <button className="btn load-btn"><span>טעינת הקובץ</span></button>}
                    </div>

                    {!!isLoadingSurveyData.progress &&
                        <LoaderBar progress={isLoadingSurveyData.progress} />}
                </form>

                {combinedData && surveyDataLoadingStatus && (<button className="btn load-btn" onClick={analyzeData}>ביצוע ניתוח נתונים</button>)}
            </div>
        </section>
    )

}