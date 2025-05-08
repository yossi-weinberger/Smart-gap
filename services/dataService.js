import axios from 'axios'

const uploadFiles = async (tables, config) => {

    try {
        const response = await axios.post('/api/upload-sheets', { ...tables }, config)
        return response
    } catch (error) {
        throw error
    }
}

const uploadSurveyData = async (surveyData) => {
    const res = await fetch('/api/load-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...surveyData })
    })

    return res
}

const analyzeData = async () => {
    const res = await fetch('/api/calculate-goal-averages', {
        method: 'POST',
    })
}

export const dataService = {
    uploadFiles,
    uploadSurveyData,
    analyzeData
}