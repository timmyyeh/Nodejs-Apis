const route = require('express').Router()
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const bcrypt = require('bcryptjs');

route.post('/', (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }, (user, err) => {

        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        const newUser = new User({
            name,
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        jwt.sign({
                            id: user.id
                        }, config.secret,
                        {
                           expiresIn: 3600 
                        }, (err, token) => {
                            if (err) throw(err);
                            return res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });

                        })
                        
                    });
            });
        });
        
    })
});




module.exports = route;