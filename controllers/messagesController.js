const Message = require('../models/Message')


// create new message
// edit message
// view all messages
// delete message

exports.message_create_get = (req, res, next) {
    res.render('message form')
}

exports.message_create_post = (req, res, next) {
    // create message
}