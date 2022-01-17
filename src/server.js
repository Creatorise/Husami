const express = require('express');
const app = express();

app.use(express.static('client/public'));

module.exports = server;

function server(database_connection) {
    return app;
}
