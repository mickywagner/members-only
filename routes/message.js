const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messagesController')

router.get('/create', messageController.message_create_get)

router.post('/create', messageController.message_create_post)

module.exports = router