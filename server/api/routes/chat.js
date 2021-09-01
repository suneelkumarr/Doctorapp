const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Permission')
const ChatController = require('../controllers/Chat/ChatController')

router.get('/check/:id/appointment', Authenticate.isPatient, ChatController.CheckAppointmentStatus)


module.exports = router