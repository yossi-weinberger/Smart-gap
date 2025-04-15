export default function KeyTables({ tables, handleChange }) {

    return (
        <>
            <div className="form-header">
                <p className="form-headline rtl-text">קבצי מפתחות</p>
                <p className="description rtl-text">קבצי sheets לפי הוראות צוות הפיתוח של smart gap. שילוב הטבלאות מגדיר למערכת כיצד לנתח את הנתונים</p>
            </div>

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
        </>
    )
}