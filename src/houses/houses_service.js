const database = require('../services/database');
const { ObjectId } = require('mongodb');

const create = async ({ name, associates }) => {
    const house = { name, associates };
    const response = await database.houses.insertOne(house);
    return response.insertedId;
};
const get_many = async (query) => {
    const response = await database.houses.find(query);
    const houses = response.toArray();
    return houses;
};
const get_one = async (query) => {
    const house = await database.houses.findOne(query);
    return house;
};
const get_one_by_id = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const house = await get_one({ _id: ObjectId(id) });
    return house;
};
const delete_one = async (query) => {
    const { deletedCount } = await database.houses.deleteOne(query);
    if (deletedCount === 0) return false;
    return true;
};
const delete_one_by_id = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const success = await delete_one({ _id: ObjectId(id) });
    return success;
};
module.exports = {
    create,
    get_many,
    get_one,
    get_one_by_id,
    delete_one,
    delete_one_by_id,
};
