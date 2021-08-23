const router = require('express').Router()
const vehicleController = require('../controllers/vehicleController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(vehicleController.getAllVehicles)
    .post(vehicleController.createVehicle)

router.route('/:id')
    .get(auth, vehicleController.getVehicle)
    .put(auth, vehicleController.updateVehicle)
    .delete(auth, vehicleController.deleteVehicle)


module.exports = router