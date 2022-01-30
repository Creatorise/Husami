const database = require('../src/services/database')
const app = require('../src/app')
const request = require('supertest')
const server = request(app)

beforeAll(async () => {
    await database.connect('testing')
})
beforeEach(async () => {
    await database.users.deleteMany()
})
afterAll(async () => {
    await database.close()
})

describe('POST /api/users', () => {
    describe('with valid user', () => {
        test('response.status to be 202', async () => {
            const response = await send_valid_user()
            expect(response.status).toBe(202)
        })
        test('user gets stored in database', async () => {
            await send_valid_user()
            const user = await database.users.findOne(valid_user())
            expect(user).toBeTruthy()
        })
        test('responds with success true', async () => {
            const response = await send_valid_user()
            expect(response.body.success).toBe(true)
        })
    })
    describe('user already exists', () => {
        beforeEach(async () => {
            await database.users.insertOne(valid_user())
        })
        test('response.status to be 422 (Unprocessable Entity)', async () => {
            const response = await send_valid_user()
            expect(response.status).toBe(422)
        })
        test('responds with success false', async () => {
            const users = await database.users.find().toArray()
            console.log(`test ~ users`, users)

            const response = await send_valid_user()
            expect(response.body.success).toBe(false)
        })
    })
    // TODO test for invalid user (name and email)
})

function valid_user() {
    return { name: 'Any Name', email: 'somebody@example.com' }
}

async function send_valid_user() {
    const response = await server.post('/api/users').send(valid_user())
    return response
}

// describe('GET /api/users', () => {
//     beforeEach(async () => {
//         for (let i = 0; i < 4; i++) {
//             await server
//                 .post('/api/users')
//                 .send({ name: `Any Name ${i}`, email: `somebody_${i}_@example.com` })
//         }
//     })
//     test('dummy', () => {})
// })
