const express = require('express');
const app = express();

app.use(express.static('client/public'));

app.get('/hello-world', (_, res) => res.send('Hello, World!'));

module.exports = app;
