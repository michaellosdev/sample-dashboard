const express = require('express')
const router = express.Router()
const customerControllers = require('../controllers/customerControllers')
const estimateControllers = require('../controllers/estimateControllers')
const {verifyJWT} = require('../middleware/verifyJWT')



router.get('/', verifyJWT, estimateControllers.getAllEstimates)
router.get('/myEstimates/:id', verifyJWT, estimateControllers.getOne)
router.post('/', verifyJWT, estimateControllers.createNewEstimate)
router.get('/myEstimates', verifyJWT, estimateControllers.getAssignedEstimates)
router.patch('/myEstimates/:id', verifyJWT,estimateControllers.updateEstimate)
router.delete('/myEstimates/:id', verifyJWT,estimateControllers.deleteOneEstimate)

module.exports = router
