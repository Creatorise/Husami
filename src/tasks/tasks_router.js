const { auth, access } = require('../auth/auth_middlewares');
const tasks = require('./tasks_controllers');

const express = require('express');
const router = express.Router({ mergeParams: true });

router.post('/', auth(access.admin), tasks.create);
// router.get('/', auth(access.admin), tasks.get_all);
// router.get('/:id', auth(access.admin), tasks.get_one);
// // router.put('/:id', auth(access.admin), tasks.update_one);
// router.delete('/:id', auth(access.admin), tasks.delete_one);

module.exports = router;
