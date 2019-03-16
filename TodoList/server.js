const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

app.get('/healthcheck', (req, res) => {
    res.send('ok');
});

var server = app.listen(5000, function(){
    console.log('Start running the server...');
});