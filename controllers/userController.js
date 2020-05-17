const User = require('../models/User')
const { body, validationResult, sanitizeBody } = require('express-validator')

const bcrypt = require('bcryptjs')

// create user
// update user
// delete user
// view all users

exports.create_user_post= [
    body('firstname', 'First name is required').trim().isLength({min: 1}),
    body('lastname', 'Last name is required').trim().isLength({min: 1}),
    body('email', 'An email is required').isEmail().normalizeEmail().custom(value => {
        return User.findOne({email: value}).then(user => {
            if(user) {
                return Promise.reject('Email is already in use')
            }
        })
    }),
    body('password', 'Password is required'),
    body('confirmpassword').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
        }
        return true
    }),

    sanitizeBody('*'),

    (req, res, next) => {
        const errors = validationResult(req)

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            var user = new User(
                {
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    email: req.body.email,
                    password: hashedPassword,
                    isMember: false,
                    isAdmin: false,
                    messages: []
                }
            )

            if(!errors.isEmpty()) {
                res.render('signup', { errors: errors.array()})
            } else {
                user.save(function(err) {
                    if(err) {return next(err)}
                    res.redirect('/login')
                })
            }
            
        })    
    }
]

