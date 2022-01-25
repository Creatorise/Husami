const { MongoClient } = require('mongodb');

require('dotenv').config();
const client = new MongoClient(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

(async function () {
    try {
        await client.connect();

        const api_db = client.db('api');
        const users_collection = api_db.collection('users');

        const response = await users_collection.insertOne({
            name: 'Manager',
            email: 'manager@creatorise.com',
            role: 'admin',
        });
        console.log(`response`, response);
    } catch (error) {
        console.error(`database ~ error`, error);
    }
})();
