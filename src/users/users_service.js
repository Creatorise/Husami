const database = require('../services/database');
const { ObjectId } = require('mongodb');

const get_all = async (query) => {
    const response = await database.users.find(query);
    const users = response.toArray();
    return users;
};
const get_one = async (query) => {
    const user = await database.users.findOne(query);
    return user;
};
const get_one_by_id = async (id) => {
    try {
        const user = await get_one({ _id: ObjectId(id) });
        return user;
    } catch (error) {
        return null;
    }
};
const create = async ({ name, email, role }) => {
    const new_user = { name, email, role };
    const existing_user = await database.users.findOne({ email });
    if (existing_user) {
        return { success: false };
    }
    const response = await database.users.insertOne(new_user);
    return { success: true, id: response.insertedId };
};
const delete_one = async (query) => {
    const response = await database.users.deleteOne(query);
    if (response.deletedCount === 0) return false;
    return true;
};
const delete_one_by_id = async (id) => {
    try {
        const was_deleted = await delete_one({ _id: ObjectId(id) });
        return was_deleted;
    } catch (error) {
        return false;
    }
};
module.exports = {
    get_all,
    get_one,
    get_one_by_id,
    create,
    delete_one,
    delete_one_by_id,
};
