const express = require('express');
const app = express();

app.use(express.static('client/public'));

const api_router = require('./api_router');
app.use('/api', api_router);

module.exports = app;
