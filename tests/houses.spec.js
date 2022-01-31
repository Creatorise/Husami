const database = require('../src/services/database')
const app = require('../src/app')
const request = require('supertest')
const server = request(app)

beforeAll(async () => {
    await database.connect('testing')
})
beforeEach(async () => {
    await database.houses.deleteMany()
})
afterAll(async () => {
    await database.close()
})

const admin_auth_cookie =
    'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNzAxMzVlNDdjYTA3ZDMzMTExZjM3Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MzYzNTE2OX0.hxj7ixm9_4sl__Bx41rnyeElW8c1w-TuGjhrrlYcscc'

describe('Create a new house', () => {
    describe('Invalid house', () => {
        let response
        beforeAll(async () => {
            response = await server
                .post('/api/houses')
                .send({})
                .set('Cookie', admin_auth_cookie)
        })
        test('Response status 400', () => {
            expect(response.status).toBe(400)
        })
        test('Response body success false', () => {
            expect(response.body.success).toBe(false)
        })
    })
})
