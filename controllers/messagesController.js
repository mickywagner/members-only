const Message = require('../models/Message')
const User = require('../models/User')

const { body, validationResult, sanitizeBody } = require('express-validator')

exports.message_list = (req, res, next) => {
    Message.find({})
           .populate('author')
           .exec(function(err, messages) {
                if(err) { return next(err) }
                res.render('index', {messages: messages})
    })
}

exports.message_create_get = (req, res, next) => {
    res.render('message_form', {title: 'Create a new message'})
}

exports.message_create_post = [
    body('title', 'Title is required').trim().isLength({min: 1}),
    body('text', 'Message text is required').trim().isLength({min: 1}),

    sanitizeBody('*'),

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
            User.findById(req.user._id).exec(function(err, theuser) {
                if(err) {return next(err)}
                message.save(function(err) {
                    if(err) {return next(err)}
                    theuser.messages.push(message._id)
                    theuser.save()
                    res.redirect('/')
                })
            }) 
        }
    }

]

exports.message_delete_get = (req, res, next) => {
    Message.findById(req.params.id)
           .populate('author')
           .exec(function(err, message) {
               if(err) {return next(err)}
               res.render('message_delete', {message: message})
           })
}

exports.message_delete_post = (req, res, next) => {
    Message.findByIdAndRemove(req.body.id, function deleteMessage(err) {
        if(err) {return next(err)}
        console.log('message deleted')
        res.redirect('/')
    })
    
}