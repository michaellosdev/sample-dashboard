const express = require('express')
const router = express.Router()
const invoiceControllers = require('../controllers/invoiceControllers')
const {verifyJWT} = require('../middleware/verifyJWT')

router.get('/', verifyJWT, invoiceControllers.getAllInvoices)
router.get('/myInvoices/:id', verifyJWT, invoiceControllers.getOne)
router.post('/', verifyJWT, invoiceControllers.createNewInvoice)
router.get('/myInvoices', verifyJWT, invoiceControllers.getAssignedInvoices)
router.patch('/myInvoices/:id', verifyJWT,invoiceControllers.updateInvoice)
router.delete('/myInvoices/:id', verifyJWT,invoiceControllers.deleteOneInvoice)


module.exports = router