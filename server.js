const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

let key = process.env.API_KEY;
console.log(key)

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to database`)
        db = client.db(dbName)
        collection = db.collection('movies')
    })

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.get("/search", async (request,response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search" : {
                    "autocomplete" : {
                        "query": `${request.query.query}`,
                        "path": "title",
                        "fuzzy": {
                            "maxEdits": 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        // console.log(result)
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
        // console.log(error)
    }
})

app.get("/get/:id", async (request, response) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id)
        })
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.get("/video/:id", async (request, response) => {
    try {
        const uri = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&type=video&maxResults=1&q=${request.params.id}+movie+trailer`
        const res = await fetch(uri, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
          }).then(response => response.json());

          return response.json(res);
    } catch (error) {
        response.status(500).send({message: error.message})
    }

})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.`)
})

//THIS IS THE INDEX TO APPLY TO MONGODB MOVIES COLLECTION
// {
//     "mappings": {
//         "dynamic": false,
//         "fields": {
//             "title": [
//                 {
//                     "foldDiacritics": false,
//                     "maxGrams": 7,
//                     "minGrams": 3,
//                     "tokenization": "edgeGram",
//                     "type": "autocomplete"
//                 }
//             ]
//         }
//     }
// }