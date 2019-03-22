const route = require('express').Router()
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

route.post('/', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({msg: 'invalid password'});
                jwt.sign({
                    id: user.id
                }, config.secret,
                {
                   expiresIn: 3600 
                }, (err, token) => {
                    if (err) throw(err);
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });

                })
            })
        
    })
});

// @route GET api/auth/user
route.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            res.json(user);
        });
})



module.exports = route;