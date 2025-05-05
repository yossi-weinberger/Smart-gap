import './SurveyData.css'
export default function SurveyData({ surveyData, handleChange, surveyDataLoadingStatus }) {

    return (
        <div className="link-section">
            <h3 className="form-headline rtl-text">גיליון נתונים</h3>
            <p className="description rtl-text">קובץ sheets המיוצא של תוצאות הסקר שביצעתם</p>
            {surveyDataLoadingStatus ? <p className="uploading-status">{surveyDataLoadingStatus.status}</p> :
                <input className="link-input" type="text" name="surveyData" placeholder="הדבקת קישור לטבלת הנתונים" value={surveyData} onChange={handleChange} required />
            }
        </div>
    )
}