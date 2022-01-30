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
        test('response.status to be 201', async () => {
            const response = await create_valid_user()
            expect(response.status).toBe(201)
        })
        test('user gets stored in database', async () => {
            await create_valid_user()
            const user = await database.users.findOne(valid_user())
            expect(user).toBeTruthy()
        })
        test('responds with success true', async () => {
            const response = await create_valid_user()
            expect(response.body.success).toBe(true)
        })
        // TODO: validate user
    })
    describe('user already exists', () => {
        beforeEach(async () => {
            await database.users.insertOne(valid_user())
        })
        test('response.status to be 422 (Unprocessable Entity)', async () => {
            const response = await create_valid_user()
            expect(response.status).toBe(422) // ? maybe change to 409
        })
        test('responds with success false', async () => {
            const response = await create_valid_user()
            expect(response.body.success).toBe(false)
        })
    })
    // TODO test for invalid user (name and email)
})

function valid_user() {
    return { name: 'Any Name', email: 'somebody@example.com' }
}

async function create_valid_user() {
    const response = await server.post('/api/users').send(valid_user())
    return response
}

describe('GET /api/users', () => {
    const amount_of_users = 2
    beforeEach(async () => {
        for (let i = 0; i < amount_of_users; i++) {
            await server
                .post('/api/users')
                .send({ name: `Any Name ${i}`, email: `somebody_${i}_@example.com` })
        }
    })
    test('response.status to be 200', async () => {
        const response = await server.get('/api/users')
        expect(response.status).toBe(200)
    })
    test('responds with success true', async () => {
        const response = await server.get('/api/users')
        expect(response.body.success).toBe(true)
    })
    test('data includes users array with length amount_of_users', async () => {
        const response = await server.get('/api/users')
        expect(response.body.data.users).toHaveLength(amount_of_users)
    })
})

describe('GET /api/users/:id', () => {
    test('non existing user', async () => {
        const response = await server.get('/api/users/non_existing_user_id')
        expect(response.status).toBe(404)
        expect(response.body.success).toBe(false)
    })
    test('existing user', async () => {
        const {
            body: { id },
        } = await create_valid_user()
        const response = await server.get('/api/users/' + id)
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.data.user).toBeTruthy()
    })
})

describe('DELETE /api/users/:id', () => {
    test('non existing user', async () => {
        const response = await server.delete('/api/users/non_existing_user_id')
        expect(response.status).toBe(404)
        expect(response.body.success).toBe(false)
    })
    test('existing user', async () => {
        const {
            body: { id },
        } = await create_valid_user()
        const response = await server.delete('/api/users/' + id)
        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
    })
    // TODO: response data
})
