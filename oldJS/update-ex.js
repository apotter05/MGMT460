let {MongoClient} = require("mongodb")
uri = "mongodb://localhost:27017"
client = new MongoClient(uri)
async function run() {
    try {
        await client.connect()
        database = client.db('mediadb')
        table = database.collection('movies')
        where = {title: "Test"}
        changes = {$set: {
            year: 2021, 
            website: "Test2"}}
        result = await table.updateOne(where, changes)
        console.log(`# Records Modified: ${result.modifiedCount}`)
    } finally {
        await client.close()
    }
}
run().catch(console.dir)