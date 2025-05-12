import './DataPreview.css'
export default function DataPreview({ data, clearTablesForm }) {

    const tableHeadlines = ['מטרות', 'מפתח מטרות', 'יעדים', 'מפתח יעדים', 'נושאים', 'מפתח נושאים', 'מפתח שאלות']
    const [objective, objectiveId, goal, goalId, category, categoryId, questions] = data

    return (
        <>
            <table className="data-preview">
                <thead>
                    <tr>
                        {
                            [...tableHeadlines].map((headline, i) => <th key={i}>{headline}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map(row =>
                        <tr key={row.category_id}>
                            <td>{row.objective}</td>
                            <td>{row.objective_id}</td>
                            <td>{row.goal}</td>
                            <td>{row.goal_id}</td>
                            <td>{row.category}</td>
                            <td>{row.category_id}</td>
                            <td>{row.question_ids}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <p className="re-loading" onClick={clearTablesForm}>טעינת קבצים מחדש</p>
        </>
    )
}