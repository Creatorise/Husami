const express = require('express')
const app = express()
const api = require('./api')

app.use(express.static('client/public'))

app.use('/api', api)

module.exports = app
