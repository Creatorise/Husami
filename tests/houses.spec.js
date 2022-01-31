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

describe('Create a new house', () => {})
