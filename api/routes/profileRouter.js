const router = require('express').Router()
const profileController = require('../controllers/profileController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(auth, profileController.getAllProfiles)
    .post(auth, profileController.createProfile)

router.route('/:id')
    .get(auth, profileController.getProfile)
    .put(auth, profileController.updateProfile)
    .delete(auth, profileController.deleteProfile)


module.exports = router