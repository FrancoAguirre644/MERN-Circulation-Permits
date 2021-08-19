const router = require('express').Router()
const authController = require('../controllers/authController')

// Register User
router.post('/register', authController.registerUser)

// Login User
router.post('/login', authController.loginUser)

// Verify token
router.get('/verify', authController.verifiedToken)

module.exports = router