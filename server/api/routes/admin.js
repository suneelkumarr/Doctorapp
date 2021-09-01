
const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/Admin/AuthController')
const DoctorController = require('../controllers/Admin/DoctorController')

// Auth
router.get('/auth/index', AuthController.Index)
router.post('/auth/store', AuthController.Store)
router.post('/auth/login', AuthController.Login)
router.get('/auth/logout', AuthController.Logout)

// Doctors
router.get('/doctor', DoctorController.Index)
router.get('/doctor/:id/show', DoctorController.Show)
router.put('/doctor/:id/account/update/:status', DoctorController.UpdateStatus)

module.exports = router