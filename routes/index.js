const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.enter)
router.get('/customers', Controller.getCustomer)
router.get('/customers/register', Controller.register)
router.post('/customers/register', Controller.registerPost)
router.get('/customers/:idCustomer/editProfile', Controller.editProfile)
router.post('/customers/:idCustomer/editProfile', Controller.editProfilePost)
router.get('/customers/:idCustomer/accounts', Controller.getAccount)
router.post('/customers/:idCustomer/accounts', Controller.getAccountPost)
router.get('/customers/:idCustomer/accounts/:idAccount/transfer', Controller.transfer)
router.post('/customers/:idCustomer/accounts/:idAccount/transfer', Controller.transferPost)

module.exports = router