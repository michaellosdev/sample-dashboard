const express = require('express')
const router = express.Router()
const customerControllers = require('../controllers/customerControllers')
const { signinCustomer } = require('../middleware/authCustomer')
const {verifyJWT, logout} = require('../middleware/verifyJWT')


router.post('/login', signinCustomer)
router.post('/logout', logout)
// GET all ciustomers 

router.get('/', verifyJWT, customerControllers.getAllCustomers )

//GET single customer

router.get('/:id',verifyJWT, customerControllers.getCustomer, )

//POST new customer

router.post('/',verifyJWT, customerControllers.createCustomer)

//DELETE a customer

router.delete('/:id', verifyJWT,customerControllers.deleteCustomer)

// //UPDATE one customer

router.patch('/:id', verifyJWT, customerControllers.updateCustomer)
router.patch('/flagged/:id', verifyJWT, customerControllers.updateCustomerFlagged)


module.exports = router