const database = require('../src/services/database')
const app = require('../src/app')
const request = require('supertest')
const server = request(app)

beforeAll(async () => {
    await database.connect('testing')
})
afterEach(async () => {
    await database.users.deleteMany()
})
afterAll(async () => {
    await database.close()
})

describe('POST /api/users', () => {
    describe('with valid user', () => {
        test('respons.status = 202', async () => {
            const response = await send_valid_user()
            expect(response.status).toBe(202)
        })
        test('user gets stored in database', async () => {
            await send_valid_user()

            const user = await database.users.findOne(valid_user())
            console.log(`test ~ user`, user)
            expect(user).toBeTruthy()
        })
        test('responds with success', async () => {
            const response = await send_valid_user()
            expect(response.success).toBe(true)
        })
    })
})

function valid_user() {
    return { name: 'Any Name', email: 'somebody@example.com' }
}

async function send_valid_user() {
    const response = await server.post('/api/users').send(valid_user())
    return response
}
