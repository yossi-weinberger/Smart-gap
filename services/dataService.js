import axios from 'axios'

const uploadFiles = async (tables, config) => {

    try {
        const response = await axios.post('/api/upload-sheets', { ...tables }, config)
        return response
    } catch (error) {
        throw error
    }
}

const uploadSurveyData = async (surveyData, config) => {
    const response = await axios.post('/api/load-survey', { ...surveyData }, config)
    return response
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