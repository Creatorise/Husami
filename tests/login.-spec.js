const database = require('../src/services/database');
const app = require('../src/app');
const request = require('supertest');
const server = request(app);

beforeAll(async () => {
    await database.connect('testing');
});
beforeEach(async () => {
    await database.users.deleteMany();
});
afterAll(async () => {
    await database.close();
});

test('with not registered user email do not get a response', done => {
    const promise = server
        .post('/api/login')
        .send({ email: 'not_registered@example.com' })
        .then();
    // console.log(`test ~ promise`, promise)
    // expect(promise)

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolved');
        }, 1000);
    });
    console.log(`promise ~ promise`, promise);
    console.log(`promise ~ promise.done`, promise.done);
});
