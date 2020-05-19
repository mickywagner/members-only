const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messagesController')

router.get('/message/create', messageController.message_create_get)

router.post('/message/create', messageController.message_create_post)