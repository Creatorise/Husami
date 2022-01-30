const { auth, access } = require('../auth/auth_middlewares')
const { get_users, get_user, create_user, delete_user } = require('./users_controllers')

const express = require('express')
const router = express.Router()
router.get('/', auth(access.admin), get_users)
router.get('/:id', auth(access.admin, access.current_user), get_user)
router.post('/', auth(access.admin), create_user)
router.delete('/:id', auth(access.admin), delete_user)

module.exports = router
