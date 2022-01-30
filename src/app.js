const users_router = require('./users/users_router')

const pino = require('pino')({ level: 'warn' })
const expressPino = require('express-pino-logger')({
    logger: pino,
})
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('client/public'))
app.use('/api/users', users_router)

module.exports = app
