const { MongoClient } = require('mongodb');
const database_functions = require('./database_functions');

const client = new MongoClient(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function initiate_database() {
    try {
        await client.connect();
        const api_db = client.db('api');
        const users_collection = api_db.collection('users');

        return database_functions(users_collection);
    } catch (error) {
        console.error(`database ~ error`, error);
    }
}

module.exports = initiate_database;
