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
async function create({ name, email }) {
    const new_user = { name, email }
    const existing_user = await database.users.findOne({ email })
    if (existing_user) {
        return { success: false }
    }
    const response = await database.users.insertOne(new_user)
    return { success: true, id: response.insertedId }
}

module.exports = { get_all, get_one, get_one_by_id, create }
