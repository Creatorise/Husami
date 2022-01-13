// express

const express = require('express');
const app = express();

// app.use(express.static('client/public'));

app.get('/', (_, res) => res.send('Hello, World!'));

app.listen(3000, () => console.log('Server up and running at port 3000'));
