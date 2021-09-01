const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/Client/ClientController')

router.get('/doctors', ClientController.DoctorsIndex)

module.exports = router