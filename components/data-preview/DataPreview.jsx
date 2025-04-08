import './DataPreview.css'
export default function DataPreview({ data }) {

    const tableHeadlines = ['מטרות', 'מפתח מטרות', 'יעדים', 'מפתח יעדים', 'מפתח שאלות']
    return (
        <table className="data-preview">
            <thead>
                {
                    tableHeadlines.reverse().map((headline, i) => <th key={i}>{headline}</th>)
                }
            </thead>
            {
                data.map(row => (
                    <tbody>
                        <tr key={row.category_id}>
                            <td>{row.question_ids}</td>
                            <td>{row.category_id}</td>
                            <td>{row.category}</td>
                            <td>{row.goal_id}</td>
                            <td>{row.goal}</td>
                        </tr>
                    </tbody>
                ))
            }
        </table>
    )
}