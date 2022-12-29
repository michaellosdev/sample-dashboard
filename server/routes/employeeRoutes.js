const express = require('express')
const router = express.Router()
const employeeControllers = require('../controllers/employeeControllers')
const { signinEmployee } = require('../middleware/auth')
const {verifyJWT, logout} = require('../middleware/verifyJWT')


// GET all ciustomers 

router.get('/', verifyJWT, employeeControllers.getAllEmployees )

//GET single customer

router.get('/:id',verifyJWT, employeeControllers.getEmployee, )

//POST new customer

router.post('/', verifyJWT, employeeControllers.createEmployee)

//DELETE a customer

router.delete('/:id',verifyJWT,  employeeControllers.deleteEmployee)

// //UPDATE one customer

router.patch('/:id', verifyJWT, employeeControllers.updateEmployee)

router.post('/login', signinEmployee)
router.post('/logout', logout)

module.exports = router