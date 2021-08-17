const router = require('express').Router()
const dailyPermitController = require('../controllers/dailyPermitController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(auth, dailyPermitController.getAllDailyPermits)
    .post(auth, dailyPermitController.createDailyPermit)

router.route('/:id')
    .get(auth, dailyPermitController.getDailyPermit)
    .delete(auth, dailyPermitController.deleteDailyPermit)


module.exports = router