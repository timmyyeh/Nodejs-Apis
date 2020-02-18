const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Users = mongoose.model('User', UserSchema)