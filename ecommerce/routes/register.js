const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();


router.get('/', (req, res) => res.send('register route'));

router.post('/', async (req, res) => {

});

module.exports = router;