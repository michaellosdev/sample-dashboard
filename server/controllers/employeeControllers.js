const User = require('../models/User')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const Item = require('../models/Item')
const Invoice = require('../models/Invoice')
const Estimate = require('../models/Estimate')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


//GET all employees
require('mongoose').set('debug', true)

const getAllEmployees = asyncHandler(async (req, res) => {

    //check access rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }
     

    const employees = await Employee.find().select('-password').populate('invoices').populate('estimates').lean()

    if (!employees.length ) {
        return res.status(404).json({message: "No employees found"})
    }

    res.status(200).json(employees)
})


//GET single employee

const getEmployee = asyncHandler(async(req, res) => {
    //const {id} = req.params 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error:'This employee does not exist'})
    }

    const employee = await Employee.findById(req.params.id).select('-password').populate('invoices').populate('estimates')

    if (!employee){
        return res.status(404).json({error:'Employee does not exist'})
    }

    res.status(200).json(employee)
})

//create a new customer 

const createEmployee = asyncHandler(async (req, res) => {
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const duplicate = await Employee.findOne({email: req.body.email}).lean()

    if(duplicate?.email === req.body.email) {
        return res.status(400).json({message:'User Already Exist'})
    }

    const hashedPwd = await bcrypt.hash(req.body.password, 10)

    const NewEmployee = { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        primaryPhoneNumber: req.body.primaryPhoneNumber,
        secondaryPhoneNumber: req.body.secondaryPhoneNumber,
        email: req.body.email,
        password: hashedPwd,
        state: req.body.state,
        city: req.body.city,
        zip: req.body.zip,
        street: req.body.street,
        unit: req.body.unit,
        SSN: req.body.SSN,
        startDate: req.body.startDate,
        notes: req.body.notes,
        role: req.body.role,
        salary: req.body.salary,
        invoices: [req.body.invoices],
        estimates: [req.body.estimates],
        isActive: req.body.isActive
    }

    try {
        const employee = await Employee.create(NewEmployee)
        return res.status(201).json({message:`Employee ${req.body.firstName} created`})
        
    } catch (error) {
        return res.status(400).json({error: error.message})
        
    }
})

const deleteEmployee = asyncHandler(async(req, res) => {
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    console.log(isAdmin)
    if (!isAdmin || isAdmin.role !== 'superuser'){
        return res.status(403).json({message:'Access Denied'})
    }
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({message:"Customer doesn't exist"})
    }

    const employee = await Employee.findByIdAndDelete(req.params.id)

    if(!employee) {
        return res.status(400).json({message:"Customer doesn't exist"})
    }

    res.status(200).json(employee)
})

const updateEmployee = asyncHandler(async(req, res) => {
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    mongoose.set('debug', true)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message:"Employee doesn't exist"})
    }

    

   

    const employee = await Employee.findOneAndUpdate({_id: id}, {
        $set: req.body
    },
    { new: true, upsert: false, remove: {}, fields: {}, strict:false }
    ).select('-password')



      if(!employee) {
        return res.status(400).json({message:"Customer doesn't exist"})
    }
    

    res.status(200).json(employee)
})

const deleteOneEstimate = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if (!isAdmin || isAdmin.role !== 'superuser'){
        return res.status(403).json({message:'Access Denied'})
    }

    const estId = req.params.id

    const deleteInvoice = await Invoice.findByIdAndDelete(invId)

    if(!deleteInvoice) {
        return res.status(400).json({message:`Estimate with ID:${invId} doesn't exist`})
    }
})



module.exports = {
    getAllEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee


}