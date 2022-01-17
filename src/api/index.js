const express = require('express');
const api_router = express.Router();

api_router.use(express.json());

module.exports = api_router;

api_router.get('/', async (req, res) => {
    const database = await require('../database')();

    const sales = await database.get_all_sales();

    res.send(sales);
    // res.send({ name: 'Anthony', age: 22 });
    // res.send('Hello from api router');
});
