export async function ensureTableExists(bigQueryInstance, datasetId, tableId, schema) {
    const [tables] = await bigQueryInstance.dataset(datasetId).getTables()
    const tableNames = tables.map(t => t.id)

    if (!tableNames.includes(tableId)) {
        console.log(`Creating table ${tableId}...`)
        await bigQueryInstance.dataset(datasetId).createTable(tableId, { schema })
        await new Promise(res => setTimeout(res, 1000))
        console.log(`Table ${tableId} created.`)
    }
}