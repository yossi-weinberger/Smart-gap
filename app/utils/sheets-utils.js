
export async function getSheetDataFromUrl(url, sheets) {

    // Function to extract spreadsheetId from URL
    const extractId = (url) => {
        const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
        return match ? match[1] : ''
    }

    const spreadsheetId = extractId(url)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'A1:AP1000',
    })

    const [headers, ...rows] = response.data.values
    return rows.map(row => {
        const obj = {}
        headers.forEach((header, i) => {
            obj[header] = row[i] || ''
        })

        return obj
    })
}