let {MongoClient} = require("mongodb")
let uri = "mongodb://localhost:27017"
let client = new MongoClient(uri)

let express = require("express")
let path = require("path")

let app = express()
let port = 7777

const database = client.db('mediadb')
const movieTable = database.collection('movies')

app.use(express.static("pages"))
app.use(express.json())

app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/home.html"))
})

app.get("/retrieve", function(req, res) {
    async function run() {
        try {
            await client.connect()
            query = {}
            rows = await movieTable.find(query).sort({'title': 1})
            res.send(JSON.stringify(await rows.toArray()))
        } finally {
            await client.close()
        }
    }
    run()
})

// app.get("/retrieve-one/:title", function(req, res) {
//     async function run() {
//         try {
//             await client.connect()
//             query = {title: req.params.title}
//             row = await table.findOne(query)
//             res.send(JSON.stringify(row))
//         } finally {
//             await client.close()
//         }
//     }
//     run()
// })

app.get("/retrieve-one/:_id", function(req, res) {
    async function run() {
        try {
            await client.connect()
            query = {_id: req.params._id}
            row = await table.findOne(query)
            res.send(JSON.stringify(row))
        } finally {
            await client.close()
        }
    }
    run()
})

app.post("/create", function(req, res) {
    async function run() {
        try {
            await client.connect()
            record = {
                title   : req.body.title,
                year    : req.body.year,
                genres  : req.body.genres,
                rating  : req.body.rating,
                runtime : req.body.runtime,
                website : req.body.website
            }
            result = await movieTable.insertOne(record)
            // res.send(true)
            redirect = {site: "retrieve.html"}
            res.send(JSON.stringify(redirect))
        } finally {
            await client.close()
        }
    }
    run()
})