const database = require('../services/database')

async function get_all(query) {
    const response = await database.users.find(query)
    const users = response.toArray()
    return users
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

module.exports = { get_all, create }
