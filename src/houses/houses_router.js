const { auth, access } = require('../auth/auth_middlewares');
const { create_house, get_houses, get_house } = require('./houses_controllers');

const express = require('express');
const router = express.Router();
router.post('/', auth(access.admin), create_house);
router.get('/', auth(access.admin), get_houses);
router.get('/:id', auth(access.admin), get_house);

module.exports = router;
