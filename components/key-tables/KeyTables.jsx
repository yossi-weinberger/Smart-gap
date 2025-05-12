import DataPreview from "../data-preview/DataPreview"

export default function KeyTables({ tables, handleChange, data, clearTablesForm }) {

    const linkInputs = [
        {
            title: '1. טבלת שאלות',
            name: 'questionTable',
            placeholder: 'הדבקת קישור לטבלת שאלות',
            value: tables.questionTable,
        },
        {
            title: '2. טבלת נושאים',
            name: 'categoryTable',
            placeholder: 'הדבקת קישור לטבלת נושאים',
            value: tables.categoryTable,
        },
        {
            title: '3. טבלת יעדים',
            name: 'goalTable',
            placeholder: 'הדבקת קישור לטבלת יעדים',
            value: tables.goalTable,
        },
        {
            title: '4. טבלת מטרות',
            name: 'objectiveTable',
            placeholder: 'הדבקת קישור לטבלת מטרות',
            value: tables.objectiveTable,
        }
    ]

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

            {data ? <DataPreview data={data} clearTablesForm={clearTablesForm} /> :

                linkInputs.map((item, i) =>
                    <div className="link-section" key={i}>
                        <p className="form-headline rtl-text">{item.title}</p>
                        <input className="link-input" type="text" name={item.name} placeholder={item.placeholder} value={item.value} onChange={handleChange} required />
                    </div>)}
        </>
    )
}