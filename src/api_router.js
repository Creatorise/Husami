const express = require('express');
const api_router = express.Router();

const {
    get_all_users,
    get_user,
    create_user,
    delete_user,
} = require('./controllers/user_controllers');

api_router.use(express.json());

api_router.get('/', async (req, res) => {
    return res.send('Welcome to api root');
});

// api_router.post('/login', check_user_exists, send_login_mail);

api_router.get('/get-users', get_all_users);

api_router.post('/get-user', get_user);

api_router.post('/create-user', create_user);

api_router.post('/delete-user', delete_user);

module.exports = api_router;
