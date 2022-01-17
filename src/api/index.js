const express = require('express');
const api_router = express.Router();

module.exports = api_router;

api_router.get('/', (req, res) => {
    res.send('Hello from api router');
});
