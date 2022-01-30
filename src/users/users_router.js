const { get_users, create_user } = require('./users_controllers')

const express = require('express')
const router = express.Router()
router.get('/', get_users)
router.post('/', create_user)

module.exports = router
