require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const api_router = require('./src/api_router');
const initiate_database = require('./src/database/initiate_database');

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || 'http://localhost';
const BASE_URL = process.env.BASE_URL || `${BASE_URI}:${PORT}`;
process.env.BASE_URL = BASE_URL;

const app = express();
app.use(morgan('dev'));
app.use(express.static('client/public'));
initiate_api_router();

app.listen(PORT, function (error) {
    if (error) {
        console.log('Error in server setup');
        return;
    }
    console.log(`Server up and running on port ${PORT} (${BASE_URL})`);
});

async function initiate_api_router() {
    const database_functions = await initiate_database();

    app.use('/api', use_database, api_router);

    async function use_database(req, res, next) {
        req.db = database_functions;
        next();
    }
}
