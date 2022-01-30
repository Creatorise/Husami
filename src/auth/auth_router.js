const {
    send_auth_link,
    authenticate_link,
    remove_auth_cookie,
} = require('./login_controllers')

const express = require('express')
const router = express.Router()
router.post('/login', send_auth_link)
router.get('/login/:auth_token', authenticate_link)
router.get('/logout', remove_auth_cookie)

module.exports = router
