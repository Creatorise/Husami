const { auth, access } = require('../auth/auth_middlewares');
const users = require('./users_controllers');

const express = require('express');
const router = express.Router();

router.get('/', auth(access.admin), users.get_all);
router.get('/:id', auth(access.admin, access.current_user), users.get_one);
router.post('/', auth(access.admin), users.create_one);
router.delete('/:id', auth(access.admin), users.delete_one);

module.exports = router;
