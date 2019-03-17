const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

// connect to database
mongoose.connect(config.db, {dbName: 'todoList', useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/healthcheck', (req, res) => {
    res.send('ok');
});



var server = app.listen(5000, function(){
    console.log('Start running the server...');
});