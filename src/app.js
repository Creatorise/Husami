const users_router = require('./users/users_router')
const auth_router = require('./auth/auth_router')

const pino = require('pino')({ level: 'warn' })
const expressPino = require('express-pino-logger')({
    logger: pino,
})
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('client/public'))
app.use('/api/users', users_router)
app.use('/api/auth', auth_router)

module.exports = app
