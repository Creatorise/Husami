const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const client = new MongoClient(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database() {
    try {
        await client.connect();

        const api_db = client.db('api');
        const user_collection = api_db.collection('users');

        return database_functions(user_collection);
    } catch (error) {
        console.error(`database ~ error`, error);
    }
}

module.exports = database;

function database_functions(users_collection) {
    return { get_all_users };

    async function get_all_users() {
        const all_users = users_collection.find().toArray();
        console.log(`get_all_users ~ all_users`, all_users);
        return all_users;
    }
}
