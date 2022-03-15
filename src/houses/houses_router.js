const { auth, access } = require('../auth/auth_middlewares');
const houses = require('./houses_controllers');
const tasks_router = require('../tasks/tasks_router');

const express = require('express');
const router = express.Router();

router.get('/', auth(access.admin), houses.get_all);
router.get('/:id', auth(access.admin), houses.get_one);
router.post('/', auth(access.admin), houses.create_one);
// router.put('/:id', auth(access.admin), houses.update_one);
router.delete('/:id', auth(access.admin), houses.delete_one);

module.exports = router;
