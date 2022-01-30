const { ObjectId } = require('mongodb')
const database = require('../services/database')

async function get_all(query) {
    const response = await database.users.find(query)
    const users = response.toArray()
    return users
}
async function get_one(query) {
    const user = await database.users.findOne(query)
    return user
}
async function get_one_by_id(id) {
    try {
        const user = await get_one({ _id: ObjectId(id) })
        return user
    } catch (error) {
        return null
    }
}
async function create({ name, email, role }) {
    const new_user = { name, email, role }
    const existing_user = await database.users.findOne({ email })
    if (existing_user) {
        return { success: false }
    }
    const response = await database.users.insertOne(new_user)
    return { success: true, id: response.insertedId }
}
async function delete_one(query) {
    const response = await database.users.deleteOne(query)
    if (response.deletedCount === 0) return false
    return true
}
async function delete_one_by_id(id) {
    try {
        const was_deleted = await delete_one({ _id: ObjectId(id) })
        return was_deleted
    } catch (error) {
        return false
    }
}

module.exports = {
    get_all,
    get_one,
    get_one_by_id,
    create,
    delete_one,
    delete_one_by_id,
}
