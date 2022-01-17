const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_DB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function database() {
    try {
        await client.connect();

        const db = client.db('sample_supplies');
        const sales = db.collection('sales');

        return {
            // db,
            get_all_sales,
        };

        async function get_all_sales() {
            return await sales.find().toArray();
            // return { name: 'Anthony', age: 22 };
        }
    } catch (error) {
        console.error(`database ~ error`, error);
    }
}

module.exports = database;
