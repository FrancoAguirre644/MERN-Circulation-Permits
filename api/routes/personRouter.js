const router = require('express').Router()
const personController = require('../controllers/personController')
const auth = require('../middlewares/auth')

router.route('/')
    .get(auth, personController.getAllPersons)
    .post(auth, personController.createPerson)

router.route('/:id')
    .get(auth, personController.getPerson)
    .put(auth, personController.updatePerson)
    .delete(auth, personController.deletePerson)


module.exports = router