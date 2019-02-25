const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const path = require('path');
const { email, publicKey, privateKey } = require('../environment');
const app = express();

app.use(bodyParser.json());
webpush.setVapidDetails(`mailto:${email}`, publicKey, privateKey);

app.get('/healthcheck', (req, res) => {
    console.log(email);
    res.send('ok');
});

// subscribe route
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    const payload = JSON.stringify({title: 'Push Test'});
    webpush.sendNotification(subscription, payload)
            .catch(err => console.log(err));
})

app.listen(5000, (req, res) => {
    console.log('Server is on!!');
});