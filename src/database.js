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
    return {
        get_users,
        get_user,
        create_user,
        delete_user,
    };

    // TODO: Add error handling in functions

    async function get_users(user_query) {
        const users = await users_collection.find(user_query).toArray();
        return users;
    }

    async function get_user(user_query) {
        const user = await users_collection.findOne(user_query);
        return user;
    }

    async function create_user(name, email) {
        const user = { name, email };
        // console.log(`create_user ~ user`, user);
        // console.log(`create_user ~ get_user({ email })`);

        if (await get_user({ email })) {
            return false;
        }
        const response = await users_collection.insertOne(user);
        // console.log(`create_user ~ response`, response);

        return true;
    }

    async function delete_user(email) {
        const { deletedCount } = await users_collection.deleteOne({ email });

        if (deletedCount === 0) {
            return false;
        }
        return true;
    }
}
