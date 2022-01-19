const express = require('express');
const api_router = express.Router();

const hello_world_controller = require('./controllers/hello_world_controller');
const { get_all_users, get_one_user } = require('./controllers/user_controllers');

api_router.use(express.json());

api_router.get('/', async (req, res) => {
    return res.send('Welcome to api root');
});

api_router.get('/hello-world', hello_world_controller);

api_router.get('/users', get_all_users);

api_router.get('/user/:name', get_one_user);

module.exports = api_router;
