const request = require('supertest');
const app = require('../src/app');
const server = request(app);

describe('GET /', () => {
    test('status 200', async () => {
        const response = await server.get('/');
        expect(response.status).toBe(200);
    });

    test('html', async () => {
        const response = await server.get('/');
        expect(response.headers['content-type']).toBe('text/html; charset=UTF-8');
    });
});
