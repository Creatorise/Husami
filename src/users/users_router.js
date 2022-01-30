const { create_user } = require('./users_controllers')

const express = require('express')
const router = express.Router()
router.post('/', create_user)

module.exports = router
