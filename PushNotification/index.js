const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();

app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
    res.send('ok');
});

app.listen(5000, (req, res) => {
    console.log('Server is on!!');
});