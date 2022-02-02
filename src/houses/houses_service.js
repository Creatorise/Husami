const { ObjectId } = require('mongodb');
const database = require('../services/database');

async function create({ name, associates }) {
    const house = { name, associates };
    const response = await database.houses.insertOne(house);
    return { success: true, id: response.insertedId };
}
async function get_many(query) {
    const response = await database.houses.find(query);
    const houses = response.toArray();
    return houses;
}
async function get_one(query) {
    const house = await database.houses.findOne(query);
    return house;
}
async function get_one_by_id(id) {
    const house = await get_one({ _id: ObjectId(id) });
    return house;
}
module.exports = {
    create,
    get_many,
    get_one,
    get_one_by_id,
};
