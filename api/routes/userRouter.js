const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(auth, userController.getAllUsers)
    .post(auth, userController.createUser)

router.route('/:id')
    .get(auth, userController.getUser)
    .put(auth, userController.updateUser)
    .delete(auth, userController.deleteUser) 


module.exports = router