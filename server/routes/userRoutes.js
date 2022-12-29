const express = require('express')
const router = express.Router()
const usersContrroller = require('../controllers/usersControllers')

router.route('/')
    .get(usersContrroller.getAllUsers)
    .post(usersContrroller.createNewUser)
    .patch(usersContrroller.updateUser)
    .delete(usersContrroller.deleteUser)

module.exports = router