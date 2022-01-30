require('dotenv').config()

const { MongoClient } = require('mongodb')

async function create_user(req, res) {
    console.log(`create_user ~ req.body`, req.body)
    const mongo_client = new MongoClient(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    await mongo_client.connect()
    const database = mongo_client.db('testing')
    const users_collection = database.collection('users')

    await users_collection.insertOne(req.body)

    mongo_client.close() // maybe not needed

    return res.status(202).end()
}

module.exports = { create_user }
