const express = require('express');
const app = express();

const api_router = require('./api');

app.use(express.static('client/public'));

app.use('/api', api_router);

module.exports = app;
