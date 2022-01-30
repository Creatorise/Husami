const { get_users, get_user, create_user } = require('./users_controllers')

const express = require('express')
const router = express.Router()
router.get('/', get_users)
router.get('/:id', get_user)
router.post('/', create_user)

module.exports = router
