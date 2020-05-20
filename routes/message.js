const express = require('express')
const router = express.Router()

const messageController = require('../controllers/messagesController')

router.get('/create', messageController.message_create_get)

router.post('/create', messageController.message_create_post)

router.get('/:id/delete', messageController.message_delete_get)

router.post('/:id/delete', messageController.message_delete_post)

module.exports = router