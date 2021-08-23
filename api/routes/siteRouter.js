const router = require('express').Router()
const siteController = require('../controllers/siteController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(siteController.getAllSites)
    .post(siteController.createSite)

router.route('/:id')
    .get(auth, siteController.getSite)
    .put(auth, siteController.updateSite)
    .delete(auth, siteController.deleteSite)


module.exports = router