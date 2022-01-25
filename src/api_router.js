const express = require('express');
const api_router = express.Router();

const authenticate_login = require('./controllers/authenticate_login');

const auth = require('./middlewares/auth');

const {
    get_all_users,
    get_one_user,
    create_user,
    delete_user,
} = require('./controllers/user_controllers');

api_router.use(express.json());

api_router.get('/', async (req, res) => {
    return res.send('Welcome to api root');
});

api_router.post('/auth/login', authenticate_login);

api_router.get('/users', auth.admin, get_all_users);

api_router.post('/user/get', auth.admin, get_one_user);

api_router.post('/user/create', auth.admin, create_user);

api_router.post('/user/delete', auth.admin, delete_user);

module.exports = api_router;
