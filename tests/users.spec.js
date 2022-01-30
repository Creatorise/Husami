const request = require('supertest')
const app = require('../src/app')
const server = request(app)

describe('POST /api/users', () => {
    test('status 202', async () => {
        const response = await server.post('/api/users')
        expect(response.status).toBe(202)
    })
})
