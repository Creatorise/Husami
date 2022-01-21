const express = require('express');
const app = express();

app.use(express.static('client/public'));

require('dotenv').config();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, function (error) {
    if (error) {
        console.log('Error in server setup');
        return;
    }
    console.log(`Server up and running on port ${PORT} (http://localhost:${PORT})`);
});

(async function () {
    const initiate_database = require('./src/database');
    const database = await initiate_database();

    const api_router = require('./src/api_router');
    app.use('/api', use_database, api_router);

    async function use_database(req, _, next) {
        req.db = database;
        next();
    }
})();

// DEBUG cookies

const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

app.get('/check-cookie-test', (req, res) => {
    console.log(`app.get ~ req.cookies`, req.cookies);
    res.send('/check-cookie-test recieved');
});

app.get('/get-cookie-test', (req, res) => {
    // console.log(`app.get ~ req.cookie`, req.cookie);
    res.cookie('x-date-now', Date.now(), { maxAge: 900000, httpOnly: true });
    res.send('/get-cookie-test recieved');
});
