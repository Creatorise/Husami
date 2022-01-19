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

const initiate_database = require('./src/database');

initiate_database()
    .then(database => {
        console.log(`database`, database);
        const api_router = require('./src/api_router');

        app.use((req, res, next) => {
            req.db = database;
            next();
        });

        app.use('/api', api_router);
    })
    .catch(error => {
        console.log(error);
    });
