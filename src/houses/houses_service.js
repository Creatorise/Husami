const { ObjectId } = require('mongodb')
const database = require('../services/database')

async function create({ name, email, role }) {
    const new_user = { name, email, role }
    const existing_user = await database.users.findOne({ email })
    if (existing_user) {
        return { success: false }
    }
    const response = await database.users.insertOne(new_user)
    return { success: true, id: response.insertedId }
}
module.exports = {
    create,
}
