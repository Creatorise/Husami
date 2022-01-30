require('dotenv').config()
const { MongoClient } = require('mongodb')

const app = require('../src/app')
const request = require('supertest')
const server = request(app)

describe('POST /api/users', () => {
    test('status 202 when sending valid user', async () => {
        const response = await send_valid_user()
        expect(response.status).toBe(202)
    })
    test('user should be saved in database', async () => {
        await send_valid_user()

        const mongo_client = new MongoClient(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await mongo_client.connect()
        const database = mongo_client.db('testing')
        const users_collection = database.collection('users')
        const user = await users_collection.findOne(valid_user())
        console.log(`test ~ user`, user)
        expect(user).toBeTruthy()
        mongo_client.close() // maybe not needed
    })
})

function valid_user() {
    return { name: 'Any Name', email: 'somebody@example.com' }
}

async function send_valid_user() {
    const response = await server.post('/api/users').send(valid_user())
    return response
}
