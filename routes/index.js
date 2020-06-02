var express = require('express');
var router = express.Router();

const passport = require('passport')
const initialize = require('../passport.config')
initialize(passport)

const userController = require('../controllers/userController')
const messageController = require('../controllers/messagesController')

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/')
  }
  next()
}

router.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})
/* GET home page. */
router.get('/', messageController.message_list)

router.get('/signup', checkNotAuthenticated, (req, res, next) => {
  res.render('signup')
})

router.post('/signup', userController.create_user_post)

router.get('/login', checkNotAuthenticated, (req, res, next) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
  }
))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/join', (req, res) => {
  res.render('membership')
})

router.post('/join', userController.update_membership_post)

module.exports = router;
