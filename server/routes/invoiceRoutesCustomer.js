const express = require('express')
const router = express.Router()
const invoiceControllers = require('../controllers/invoiceControllers')
const {verifyJWT} = require('../middleware/verifyJWT')

router.get('/:id', verifyJWT, invoiceControllers.getCustomersInvoice)
router.get('/', verifyJWT, invoiceControllers.getAssignedInvoices)



module.exports = router