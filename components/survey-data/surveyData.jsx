import './SurveyData.css'
import Image from "next/image"

export default function SurveyData({ surveyData, handleChange, surveyDataLoadingStatus, clearSurveyForm }) {

    return (
        <div className="link-section">
            <h3 className="form-headline rtl-text">גיליון נתונים</h3>
            <p className="description rtl-text">קובץ sheets המיוצא של תוצאות הסקר שביצעתם</p>
            {surveyDataLoadingStatus ?
                <>
                    <div className="upload-indicator">
                        <p className="upload-indicator">שאלון חניכים בקהילת-תגובות</p>
                        <p className="re-loading" onClick={clearSurveyForm}>טעינת קובץ חדש</p>
                    </div>
                    <div className="survey-data-status">
                        <Image
                            src="/icons/v-icon-green.svg"
                            alt="Feature Icon"
                            width={24}
                            height={24}
                            className="feature-icon"
                        />
                        <p className="uploading-status">{surveyDataLoadingStatus.status}</p>
                    </div>
                </>
                :
                <input className="link-input"
                    type="text"
                    name="surveyData"
                    placeholder="הדבקת קישור לטבלת הנתונים"
                    value={surveyData}
                    onChange={(e) => handleChange(e, 'survey')}
                    required />
            }
        </div>
    )
}