const { auth, access } = require('../auth/auth_middlewares')
const { create_house } = require('./houses_controllers')

const express = require('express')
const router = express.Router()
router.post('/', auth(access.admin), create_house)

module.exports = router
