const Message = require('../models/Message')
const { body, validationResult } = require('express-validator')

// create new message
// edit message
// view all messages
// delete message

exports.message_create_get = (req, res, next) => {
    res.render('message_form', {title: 'Create a new message'})
}

exports.message_create_post = [
    body('title', 'Title is required').trim().isLength({min: 1}).escape(),
    body('text', 'Message text is required').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req)

        var message = new Message({
            title: req.body.title,
            timestamp: Date.now(),
            author: req.user._id,
            text: req.body.text
        })

        if(!errors.isEmpty()) {
            res.render('message_form', {title: 'Create a new message', errors: errors.array(), message: message})
        }

        else {
            message.save(function(err) {
                if(err) {return next(err)}
                console.log('message created!')
                res.redirect('/')
            })
        }
    }


]