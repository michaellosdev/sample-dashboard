const express = require('express')
const router = express.Router()
const estimateControllers = require('../controllers/estimateControllers')
const {verifyJWT} = require('../middleware/verifyJWT')

router.get('/:id', verifyJWT, estimateControllers.getCustomersEstimate)
router.get('/', verifyJWT, estimateControllers.getAssignedEstimates)



module.exports = router