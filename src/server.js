const express = require('express');
const app = express();

// app.use(express.static('client/public'));

app.get('/', (_, res) => res.send('Hello, World!'));

module.exports = app;
