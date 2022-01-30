require('dotenv').config()
const { MongoClient } = require('mongodb')
const mongo_client = new MongoClient(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// async function connect(database_name) {
//     await mongo_client.connect()
//     this.database = mongo_client.db(database_name)
//     this.users = database.collection('users')

//     // mongo_client.close() // maybe not needed

//     return { database, users }
// }

module.exports = {
    connect: async function (database_name) {
        await mongo_client.connect()
        const database = mongo_client.db(database_name)
        const users = database.collection('users')

        this.database = database
        this.users = users

        // mongo_client.close() // maybe not needed
    },
}
