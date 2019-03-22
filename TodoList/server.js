const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
app.use(express.json());

// Routes
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

// connect to database
mongoose.connect(config.db, {dbName: 'todoList', useNewUrlParser: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// use Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/healthcheck', (req, res) => {
    res.send('ok');
});



var server = app.listen(5000, 'localhost',function(){
    console.log('Start running the server...');
});