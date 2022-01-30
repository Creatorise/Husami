const database = require('../services/database')

async function create(user) {
    const response = await database.users.insertOne(user)
    return { success: true, id: response.insertedId }
}

module.exports = { create }
