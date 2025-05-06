import DataPreview from "../data-preview/DataPreview"

export default function KeyTables({ tables, handleChange, data }) {

    return (
        <>
            <div className="form-header">
                <h3 className="form-headline rtl-text">קבצי מפתחות</h3>
                {
                    data ?
                        <p className="description rtl-text">קליטת המערכת לקבצי המפתחות</p> :
                        <p className="description rtl-text">קבצי sheets לפי הוראות צוות הפיתוח של smart gap. שילוב הטבלאות מגדיר למערכת כיצד לנתח את הנתונים</p>
                }
            </div>

            {data ? <DataPreview data={data} /> :
                <>
                    <div className="link-section">
                        <p className="form-headline rtl-text">1. טבלת שאלות</p>
                        <input className="link-input" type="text" name="questionTable" placeholder="הדבקת קישור לטבלת שאלות" value={tables.questionTable} onChange={handleChange} required />
                    </div>

                    <div className="link-section">
                        <p className="form-headline rtl-text">2. טבלת נושאים</p>
                        <input className="link-input" type="text" name="categoryTable" placeholder="הדבקת קישור לטבלת נושאים" value={tables.categoryTable} onChange={handleChange} required />
                    </div>

                    <div className="link-section">
                        <p className="form-headline rtl-text">3. טבלת יעדים</p>
                        <input className="link-input" type="text" name="goalTable" placeholder="הדבקת קישור לטבלת יעדים" value={tables.goalTable} onChange={handleChange} required />
                    </div>

                    <div className="link-section">
                        <p className="form-headline rtl-text">4. טבלת מטרות</p>
                        <input className="link-input" type="text" name="objectiveTable" placeholder="הדבקת קישור לטבלת מטרות" value={tables.objectiveTable} onChange={handleChange} required />
                    </div>
                </>}
        </>
    )
}