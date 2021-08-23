const router = require('express').Router()
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')

// Register User
router.post('/register', authController.registerUser)

// Login User
router.post('/login', authController.loginUser)

// Verify token
router.get('/verify', authController.verifiedToken)

// Verify token
router.patch('/resetPassword', auth, authController.resetPassword)

module.exports = router