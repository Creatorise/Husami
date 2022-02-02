const database = require('../src/services/database');
const app = require('../src/app');
const request = require('supertest');
const server = request(app);

beforeAll(async () => {
    await database.connect('testing');
});
afterAll(async () => {
    await database.close();
});

const admin_auth_cookie =
    'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNzAxMzVlNDdjYTA3ZDMzMTExZjM3Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MzYzNTE2OX0.hxj7ixm9_4sl__Bx41rnyeElW8c1w-TuGjhrrlYcscc';
const current_user_id = '61f70135e47ca07d33111f37';

describe('Create a new house', () => {
    describe('Invalid house', () => {
        let response;
        beforeAll(async () => {
            await database.houses.deleteMany();
            response = await server
                .post('/api/houses')
                .send({})
                .set('Cookie', admin_auth_cookie);
        });
        test('Response status 400', () => {
            expect(response.status).toBe(400);
        });
        test('Response body success false', () => {
            expect(response.body.success).toBe(false);
        });
    });
    const valid_house = {
        name: 'Any name',
        associates: [{ id: current_user_id, role: 'admin' }],
    };
    describe('Valid house', () => {
        let response;
        beforeAll(async () => {
            await database.houses.deleteMany();
            response = await server
                .post('/api/houses')
                .send(valid_house)
                .set('Cookie', admin_auth_cookie);
        });
        test('House should be stored in database', async () => {
            const houses = await database.houses.find().toArray();
            expect(houses).toHaveLength(1);
        });
        test('Response status code 201', () => {
            expect(response.status).toBe(201);
        });
        test('Response body success true', () => {
            expect(response.body.success).toBe(true);
        });
    });
});

describe('Get all houses', () => {
    let response;
    beforeAll(async () => {
        await database.houses.deleteMany();
        for (let i = 0; i < 3; i++) {
            await database.houses.insertOne({
                name: 'Any name ' + i,
                associates: [{ id: current_user_id, role: 'admin' }],
            });
        }
        response = await server.get('/api/houses').set('Cookie', admin_auth_cookie);
    });
    test('Response status code 200', async () => {
        expect(response.status).toBe(200);
    });
    test('Response body success true', async () => {
        expect(response.body.success).toBe(true);
    });
    test('Returns body data with houses', async () => {
        expect(response.body.data.houses).toHaveLength(3);
    });
});

describe('Get one house', () => {
    let response;
    beforeAll(async () => {
        const { insertedId } = await database.houses.insertOne({
            name: 'Any name ',
            associates: [{ id: current_user_id, role: 'admin' }],
        });
        response = await server
            .get('/api/houses/' + insertedId.toString())
            .set('Cookie', admin_auth_cookie);
    });
    test('Response status code 200', () => {
        expect(response.status).toBe(200);
    });
    test('Response body success true', () => {
        expect(response.body.success).toBe(true);
    });
    test('Response body data with house', () => {
        expect(response.body.data.house).toBeTruthy();
    });
});
