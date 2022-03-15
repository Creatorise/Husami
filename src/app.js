const auth_router = require('./auth/auth_router');
const houses_router = require('./houses/houses_router');
const users_router = require('./users/users_router');

global.log = require('signale');
log.disable();
const morgan = require('morgan');
const cookie_parser = require('cookie-parser');
const express = require('express');
const app = express();
if (process.env.NODE_ENV === 'development') {
    // app.use(morgan('dev'));
    log.enable();
}
app.use(cookie_parser());
app.use(express.json());
app.use('/', express.static('client'));
app.use('/api/auth', auth_router);
app.use('/api/houses', houses_router);
app.use('/api/users', users_router);

module.exports = app;
