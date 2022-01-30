const users_router = require('./users/users_router')

const express = require('express')
const app = express()
app.use(express.static('client/public'))
app.use('/api/users', users_router)

module.exports = app
