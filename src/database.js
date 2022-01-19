const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const client = new MongoClient(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function initiate_database() {
    try {
        await client.connect();

        const api_db = client.db('api');
        const user_collection = api_db.collection('users');

        console.log('database connected');

        return database_functions(user_collection);
    } catch (error) {
        console.error(`database ~ error`, error);
    }
}

module.exports = initiate_database;

function database_functions(users_collection) {
    return { get_all_users, get_one_user };

    async function get_all_users() {
        const all_users = await users_collection.find().toArray();
        return all_users;
    }

    async function get_one_user(name) {
        const user = await users_collection.findOne({ name: name });
        return user;
    }
}
