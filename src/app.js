require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const api_router = require('./api_router');
const initiate_database = require('./database/initiate_database');

const node_env = process.env.NODE_ENV;

const app = express();
app.use(morgan('dev'));
app.use(express.static('client/public'));
initiate_api_router();

async function initiate_api_router() {
    const database_functions = await initiate_database();

    app.use('/api', use_database, api_router);

    async function use_database(req, res, next) {
        req.db = database_functions;
        next();
    }
}

module.exports = app;
