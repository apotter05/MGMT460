let { MongoClient } = require("mongodb")
uri = "mongodb://localhost:27017"
client = new MongoClient(uri)
async function run() {
    try {
        await client.connect()
        database = client.db('mediadb')
        table = database.collection('movies')
        query = { title: "Get Out" }
        row = await table.findOne(query)
        console.log(row)
    } finally {
        await client.close();
    }
}
run().catch(console.dir);