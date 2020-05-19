var express = require('express');
var router = express.Router();

const passport = require('passport')
const initialize = require('../passport.config')
initialize(passport)

const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup')
})

router.post('/signup', userController.create_user_post)

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }
))

module.exports = router;
