import './DataPreview.css'
export default function DataPreview({ data, clearTablesForm }) {

    const tableHeadlines = ['מטרות', 'יעדים', 'נושאים', 'מפתח שאלות']

    const calculateRowSpans = (rows, key) => {
        const spans = {}
        let prevValue = null
        let count = 0
        let startIdx = 0

        rows.forEach((row, i) => {
            if (row[key] !== prevValue) {
                if (count > 0) {
                    spans[startIdx] = count
                }
                prevValue = row[key]
                count = 1
                startIdx = i
            } else {
                count++
            }
        })

        if (count > 0) {
            spans[startIdx] = count
        }

        return spans
    }

    const objectiveSpans = calculateRowSpans(data, 'objective')
    const goalSpans = calculateRowSpans(data, 'goal')
    const categorySpans = calculateRowSpans(data, 'category')

    return (
        <>
            <table className="data-preview">
                <thead>
                    <tr>
                        {[...tableHeadlines].map((headline, i) =>
                            <th key={i}>{headline}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) =>
                        <tr key={i}>
                            {objectiveSpans[i] && (
                                <td rowSpan={objectiveSpans[i]}>{row.objective}</td>
                            )}
                            {goalSpans[i] && (
                                <td rowSpan={goalSpans[i]}>{row.goal}</td>
                            )}
                            {categorySpans[i] && (
                                <td rowSpan={categorySpans[i]}>{row.category}</td>
                            )}
                            <td>{row.question_ids}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <p className="re-loading" onClick={clearTablesForm}>טעינת קבצים מחדש</p>
        </>
    )
}