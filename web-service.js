let {MongoClient} = require("mongodb")
let uri = "mongodb://localhost:27017"
let client = new MongoClient(uri)

let express = require("express")
let path = require("path")

let app = express()
let port = 7777

const database = client.db('mediadb')
const moveTable = database.collection('movies')

app.use(express.static("pages"))
app.use(express.json())

app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/pages/home.html"))
})