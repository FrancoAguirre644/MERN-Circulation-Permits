const router = require('express').Router()
const userController = require('../controllers/userController')

// Register User
router.post('/register', userController.registerUser)

module.exports = router