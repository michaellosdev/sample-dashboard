const User = require('../models/User')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const Item = require('../models/Item')
const Invoice = require('../models/Invoice')
const Estimate = require('../models/Estimate')
const asyncHandler = require('express-async-handler')
const bcryprt = require('bcrypt')
const mongoose = require('mongoose')

//@desc get all invoices
//roue GET /invoices
//@access Private 
require('mongoose').set('debug', true)

const getAllInvoices = asyncHandler(async(req, res) => {
    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const invoices = await Invoice.find().populate('employee').populate('customer').populate('items')
    if (!invoices?.length) {
        return res.status(404).json({message:'No invoices found'})
    }



    res.json(invoices)

})

//@desc  create new invoice
//roue POST /invoices
//@access Private 

const createNewInvoice = asyncHandler(async (req, res) => {
    //check if admin
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    } 
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const itemIds = req.body.items.map(id => mongoose.Types.ObjectId(id))


    const newInvoice = {
        items: itemIds,
        customItems: req.body.customItems,
        totalPrice: req.body.totalPrice,
        discount: req.body.discount,
        sendToEmails: [req.body.sendToEmails],
        signed: req.body.signed,
        signature: req.body.signature,
        status: req.body.status,
        customer: req.body.customer,
        employee: req.body.employee,
        blueeprint: req.body.blueeprint,
        createdAt: req.body.createdAt,
        dueDate: req.body.dueDate
    }
 
    
    try {
        const invoice = await Invoice.create(newInvoice)
        return res.status(201).json(invoice)
    } catch (err) {
        return res.status(400).json(err)

    }
})

//@desc find one invoice
//rote GET /invoices/myInvoices
//@acces private
const getAssignedInvoices = asyncHandler(async(req, res) => {
    const id = req.body.id
    console.log(id)
    const invIds = []

    const employees = await Employee.findById(id)
    const customers = await Customer.findById(id)

    // const allInvoices = await Invoice.find()

    //check if its employee

    if(employees) {
        if (!employees) {
            res.status(400).json({message: 'No employees found'})
        } else {
            employees.invoices.map(item => {
                invIds.push(item)
            })
        }
    }

    //check if its customer
 
    if(customers) {
        if (!customers) {
           return res.status(400).json({message: 'No customers found'})
        } 
    }

    const a =  await Invoice.find({customer: id}).populate('customer').populate('employee').populate('items')
            

    // const invoices = await Invoice.find({'_id': {$in: invIds}}).populate('employee').populate('customer').populate('items')
    if (!a.length) {
        
        return res.status(400).json({message: 'No invoices found'})
    } 


    res.status(200).json(a)
})





const getOne = asyncHandler(async(req, res) => {
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    } 

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }


    const oneInvoice = await Invoice.findById(req.params.id).populate('employee').populate('customer').populate('items')
    if (!oneInvoice) {
        return res.status(404).json({message:'No invoices found'})
    }



    res.json(oneInvoice)
})

const getCustomersInvoice = asyncHandler(async(req, res) => {
    const id = req.body.id
    const isCustomer = await Customer.findById(id)
    const isTech = await Employee.findById(id)
    // const one =  await Invoice.find({customer: id}).populate('customer').populate('employee')
    // if (!isAdmin || isAdmin?.role !== 'admin'){
    //     return res.status(403).json({message:'Access Denied'})
    // } 

    

    const oneInvoice = await Invoice.findById(req.params.id).populate('employee').populate('customer').populate('items')
    //check if find inv.customer equal to 
    if(!(oneInvoice?.customer?.id !== id || oneInvoice?.employee?.id !== id)) {
        return res.status(401).json({message:"You don't have access to this invoice"})
    }

    if (!oneInvoice) {
        return res.status(404).json({message:'No invoices found'})
    }
    res.json(oneInvoice)
})


//@desc update one invoice
//rote PATCH /invoices/myInvoices/:id
//@acces private

const updateInvoice = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }
    
    const invId = req.params.id

    const invoice = await Invoice.findByIdAndUpdate({_id: invId},{
        $set: req.body
    },
    { new: true, upsert: false, remove: {}, fields: {}, strict:false })

    if(!invoice) {
        return res.status(400).json({message:"Invoice doesn't exist"})
    }

    res.status(200).json(invoice)
})

const deleteOneInvoice = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const invId = req.params.id

    const deleteInvoice = await Invoice.findByIdAndDelete(invId)

    if( !deleteInvoice ) {
        return res.status(400).json({message:`Invoice with ID:${invId} doesn't exist`})
    }
})




module.exports = {
    getAllInvoices,
    createNewInvoice,
    getAssignedInvoices,
    getOne,
    updateInvoice,
    deleteOneInvoice,
    getCustomersInvoice

}