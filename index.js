const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config();
const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || 'http://localhost';
const BASE_URL = process.env.BASE_URL || `${BASE_URI}:${PORT}`;
process.env.BASE_URL = BASE_URL;

app.listen(PORT, function (error) {
    if (error) {
        console.log('Error in server setup');
        return;
    }
    console.log(`Server up and running on port ${PORT} (${BASE_URL})`);
});
