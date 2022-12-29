const express = require('express')
const router = express.Router()
const itemControllers = require('../controllers/itemControllers')
const {verifyJWT} = require('../middleware/verifyJWT')


router.get('/', verifyJWT, itemControllers.getAllItems)
router.get('/:id', verifyJWT, itemControllers.getOne)
router.post('/', verifyJWT, itemControllers.createNewItem)
router.patch('/:id', verifyJWT,itemControllers.updateItem)
router.delete('/:id', verifyJWT,itemControllers.deleteOneItem)

module.exports = router