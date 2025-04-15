
export default function SurveyData({ surveyData, handleChange }) {

    return (
        <div className="link-section">
            <p className="form-headline rtl-text">גיליון נתונים</p>
            <p className="description rtl-text">קובץ sheets המיוצא של תוצאות הסקר שביצעתם</p>
            <input className="link-input" type="text" name="surveyData" placeholder="הדבקת קישור לטבלת הנתונים" value={surveyData} onChange={handleChange} required />
        </div>
    )
}