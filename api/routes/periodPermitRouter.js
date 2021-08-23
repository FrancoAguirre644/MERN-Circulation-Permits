const router = require('express').Router()
const periodPermitController = require('../controllers/periodPermitController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(periodPermitController.getAllPeriodPermit)
    .post(periodPermitController.createPeriodPermit)

router.route('/:id')
    .get(periodPermitController.getPeriodPermit)
    .delete(auth, periodPermitController.deletePeriodPermit) 

router.route('/validateQR/:qr')
    .get(periodPermitController.validateQR)


module.exports = router