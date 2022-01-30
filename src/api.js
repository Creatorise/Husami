const express = require('express')
const router = express.Router()

router.post('/users', (req, res) => {
    res.status(202).end()
})

module.exports = router
