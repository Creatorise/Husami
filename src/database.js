const { MongoClient } = require('mongodb');

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

function database_functions(users_collection) {
    return { get_all_users, get_one_user, create_user };
    // TODO: Add error handling in functions

    async function get_all_users() {
        const all_users = await users_collection.find().toArray();
        return all_users;
    }

    async function get_one_user(user_query) {
        const user = await users_collection.findOne(user_query);
        return user;
    }

    async function create_user(name, email, password) {
        const user = { name, email, password };
        console.log(`create_user ~ get_one_user({ email })`);

        if (await get_one_user({ email })) {
            return false;
        }
        const response = await users_collection.insertOne(user);
        // console.log(`create_user ~ response`, response);

        return true;
    }
}
