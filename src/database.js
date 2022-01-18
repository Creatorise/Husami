const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_DB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function database() {
    try {
        await client.connect();

        const api_db = client.db('api');
        const users_collection = api_db.collection('users');

        return dasebase_functions(users_collection);
    } catch (error) {
        console.error(`database ~ error`, error);
    }
}

module.exports = database;

function database_functions(users_collection) {
    return { get_all_users };

    function get_all_users() {
        return [
            {
                name: 'John Doe',
                age: 22,
            },
        ];
    }
}
