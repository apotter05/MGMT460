let {MongoClient} = require("mongodb")
uri = "mongodb://localhost:27017"
client = new MongoClient(uri)
async function run() {
    try {
        await client.connect()
        database = client.db('mediadb')
        table = database.collection('movies')
        record = {
            title: "Test",
            year: 2022,
            genres: "Test",
            rating: "Test",
            runtime: "Test",
            website: "Test"
        }
        result = await table.insertOne(record)
        console.log(`Record _id: ${result.insertedId} inserted!`)
    } finally {
        await client.close()
    }
}
run().catch(console.dir)