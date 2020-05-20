var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/' + req.user._id)
});

router.get('/:id', function(req, res, next) {
  res.render('userprofile')
})


module.exports = router;
