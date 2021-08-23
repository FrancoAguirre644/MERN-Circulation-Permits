const router = require('express').Router()
const dailyPermitController = require('../controllers/dailyPermitController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(dailyPermitController.getAllDailyPermits)
    .post(dailyPermitController.createDailyPermit)

router.route('/:id')
    .get(auth, dailyPermitController.getDailyPermit)
    .delete(auth, dailyPermitController.deleteDailyPermit)

router.route('/validateQR/:qr')
    .get(dailyPermitController.validateQR)


module.exports = router