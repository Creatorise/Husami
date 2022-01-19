const initiate_database = require('./src/database');

const express = require('express');
const app = express();

app.use(express.static('client/public'));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, function (error) {
    if (error) {
        console.log('Error in server setup');
        return;
    }
    console.log(`Server up and running on port ${PORT} (http://localhost:${PORT})`);
});

const api_router = require('./src/api_router');
app.use('/api', use_database, api_router);

async function use_database(req, res, next) {
    const database = await initiate_database();

    req.db = database;

    next();
}
