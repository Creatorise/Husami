// const server = require('..'); // Link to your server file
// const supertest = require('supertest');
// const request = supertest(server);

const request = require('supertest');
const server = request.agent('http://localhost:3000');

it('tests', done => {
    // expect(true).toBe(true);
    // jest.useFakeTimers(1000);
    // const res = await server.get('/api/users');
    // console.log(`it ~ res`, res);
    // ...
    // done();
    server
        .get('/api/users')
        .expect(200)
        .end(function (err, res) {
            if (err) return done(err);
            console.log(res.body);
            done();
        });
});
