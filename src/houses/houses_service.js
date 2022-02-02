// const { ObjectId } = require('mongodb');
const database = require('../services/database');

async function create({ name, associates }) {
    const house = { name, associates };
    const response = await database.houses.insertOne(house);
    return { success: true, id: response.insertedId };
}
module.exports = {
    create,
};
