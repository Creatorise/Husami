const express = require('express');
const api_router = express.Router();

const users = require('./controllers/users');
const auth = require('./controllers/auth');

api_router.use(express.json());

api_router.get('/', async (req, res) => {
    return res.send('Welcome to api root');
});

api_router.post('/auth', auth.send_auth_code);
// api_router.get('/auth', auth.login);
api_router.get('/auth/:user_id/:auth_code', auth.login);

api_router.get('/users', users.index);
api_router.get('/users/:id', users.show);
api_router.post('/users', users.store);
api_router.put('/users/:id', users.update);
api_router.delete('/users/:id', users.destroy);

module.exports = api_router;
