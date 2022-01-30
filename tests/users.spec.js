const database = require('../src/services/database')

function initiate_database() {
    return new Promise(async (resolve, reject) => {
        await database.connect('testing')
        resolve()
    })
}

beforeEach(() => {
    return initiate_database()
})

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
        const user = await database.users.findOne(valid_user())
        expect(user).toBeTruthy()
    })
})

function valid_user() {
    return { name: 'Any Name', email: 'somebody@example.com' }
}

async function send_valid_user() {
    const response = await server.post('/api/users').send(valid_user())
    return response
}
