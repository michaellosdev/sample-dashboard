const express = require('express')
const router = express.Router()
const jobsControllers = require('../controllers/jobsControllers')
const {verifyJWT} = require('../middleware/verifyJWT')


router.get('/', verifyJWT, jobsControllers.getAllJobs)
router.get('/:id', verifyJWT, jobsControllers.getOne)
router.post('/', verifyJWT, jobsControllers.createNewJob)
router.patch('/:id', verifyJWT,jobsControllers.updateJob)
router.delete('/:id', verifyJWT,jobsControllers.deleteOneJob)

module.exports = router