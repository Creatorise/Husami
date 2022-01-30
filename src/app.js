const express = require('express')
const app = express()

app.use(express.static('client/public'))

app.get('/api/users', (req, res) => {
    res.end()
})

module.exports = app
