const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')
const bcrypt = require('bcryptjs')

function initialize(passport) {
    passport.use(new LocalStrategy( 
        { usernameField: 'email'},
        function(username, password, done) {
            User.findOne({email: username }, function(err, user) {
                if(err) {return done(err)}
                if(!user) {
                    return done(null, false, { message: 'Incorrect user email'})
                }
                bcrypt.compare(password, user.password, (err, res) => {
                    if(res) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Incorrect password'})
                    }
                })
            })
        }
    ))

    passport.serializeUser((user, done) => done(null, user.id))
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = initialize