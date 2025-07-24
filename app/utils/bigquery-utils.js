export async function ensureTableExists(bigQueryInstance, datasetId, tableId, schema) {
    const dataset = bigQueryInstance.dataset(datasetId)
    const table = dataset.table(tableId)

    const [exists] = await table.exists()

    if (!exists) {
        console.log(`Creating table ${tableId}...`)
        await dataset.createTable(tableId, { schema })

        await table.get()
        console.log(`Table ${tableId} created.`)
    } else {
        console.log(`Table ${tableId} already exists.`)
    }

}