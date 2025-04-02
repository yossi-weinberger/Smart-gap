'use client'
import React, { useState, useEffect } from "react"

export default function DataUploadForm() {

    const [tables, setTables] = useState({
        questionTable: "",
        categoryTable: "",
        goalTable: "",
        surveyData: "",
    })

    const handleChange = (e) => {
        const table = e.target.name
        const link = e.target.value
        setTables({ ...tables, [table]: link })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        // onSubmit(tables)
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <input type="text" name="table1" placeholder="קישור לטבלת שאלות" value={tables.questionTable} onChange={handleChange} required className="" />
            <input type="text" name="table2" placeholder="קישור לטבלת נושאים" value={tables.categoryTable} onChange={handleChange} required className="" />
            <input type="text" name="table3" placeholder="קישור לטבלת יעדים" value={tables.goalTable} onChange={handleChange} required className="" />
            <input type="text" name="surveyData" placeholder="הדבקת קישור לטבלת הנתונים" value={tables.surveyData} onChange={handleChange} required className="" />
            <button type="submit" className="">Submit</button>
        </form>
    )

}