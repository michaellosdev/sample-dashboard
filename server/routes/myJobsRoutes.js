const express = require('express')
const router = express.Router()
const jobsControllers = require('../controllers/jobsControllers')
const {verifyJWT} = require('../middleware/verifyJWT')

router.get('/', verifyJWT, jobsControllers.getAssignedJobs )

module.exports = router