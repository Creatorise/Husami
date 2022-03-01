require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongo_client = new MongoClient(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = {
    connect: async function (database_name) {
        await mongo_client.connect();
        const database = mongo_client.db(database_name);
        const users = database.collection('users');
        const houses = database.collection('houses');
        const tasks = database.collection('tasks');

        this.database = database;
        this.users = users;
        this.houses = houses;
        this.tasks = tasks;
    },
    close: async () => {
        return await mongo_client.close();
    },
};
