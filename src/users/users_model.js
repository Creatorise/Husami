require('dotenv').config()

const { MongoClient } = require('mongodb')

async function create(user) {
    const mongo_client = new MongoClient(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    await mongo_client.connect()
    const database = mongo_client.db('testing')
    const users_collection = database.collection('users')

    await users_collection.insertOne(user)

    mongo_client.close() // maybe not needed
}

module.exports = { create }
