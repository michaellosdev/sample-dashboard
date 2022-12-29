const User = require('../models/User')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const Item = require('../models/Item')
const Invoice = require('../models/Invoice')
const Estimate = require('../models/Estimate')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')


//@desc gett all estimates
//route GET /estimates
//@access private 

const getAllEstimates = asyncHandler(async(req, res) => {
    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const estimates = await Estimate.find().populate('employee').populate('customer').populate('items').lean()
    if (!estimates?.length) {
        return res.status(404).json({message:'No estimates found'})
    }



    res.json(estimates)
})
//@desc  create new invoice
//roue POST /estimates
//@access Private 

const createNewEstimate = asyncHandler(async (req, res) => {
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


    const newEstimate = {
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
        const estimate = await Estimate.create(newEstimate)
        return res.status(201).json({message:'Estimate created'})
    } catch (err) {
        return res.status(400).json({message: err})

    }
})

//@desc find asign estimates
//rote GET /invoices/myInvoices
//@acces private
const getAssignedEstimates = asyncHandler(async(req, res) => {
    const id = req.body.id
    console.log(id)
    const estIds = []

    const employees = await Employee.findById(id)
    const customers = await Customer.findById(id)

    //check if its employee

    if(employees) {
        if (!employees) {
            res.status(400).json({message: 'No employees found'})
        } else {
            employees.estimates.map(item => {
                estIds.push(item)
            })
        }
    }

    //check if its customer
 
    if(customers) {
        if (!customers) {
           return res.status(400).json({message: 'No customers found'})
        } 
    }

    const a =  await Estimate.find({customer: id}).populate('customer').populate('employee').populate('items')
            

    // const invoices = await Invoice.find({'_id': {$in: invIds}}).populate('employee').populate('customer').populate('items')
    if (!a.length) {
        
        return res.status(400).json({message: 'No estimates found'})
    } 


    res.status(200).json(a)
})

//@desc get a single estimate
//route GET estimates/myEstimates/:id
//access provate

const getOne = asyncHandler(async(req, res) => {
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    } 

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    console.log(req.params.id)

    const oneEstimate = await Estimate.findById(req.params.id).populate('employee').populate('customer').populate('items')
    if (!oneEstimate) {
        return res.status(404).json({message:'No invoices found'})
    }



    res.json(oneEstimate)
})

const getCustomersEstimate = asyncHandler(async(req, res) => {
    const id = req.body.id
    const isCustomer = await Customer.findById(id)
    // const one =  await Invoice.find({customer: id}).populate('customer').populate('employee')
    // if (!isAdmin || isAdmin?.role !== 'admin'){
    //     return res.status(403).json({message:'Access Denied'})
    // } 

    

    const oneInvoice = await Estimate.findById(req.params.id).populate('employee').populate('customer').populate('items')
    //check if find inv.customer equal to 
    if(oneInvoice.customer.id !== id) {
        return res.status(401).json({message:"You don't have access to this invoice"})
    }

    if (!oneInvoice) {
        return res.status(404).json({message:'No invoices found'})
    }
    res.json(oneInvoice)
})

//@desc update one estimate
//rote PATCH /estimates/myEstimates/:id
//@acces private

const updateEstimate = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }
    
    const estId = req.params.id

    const estimate = await Estimate.findByIdAndUpdate({_id: estId},{
        $set: req.body
    },
    { new: true, upsert: false, remove: {}, fields: {}, strict:false })

    if(!estimate) {
        return res.status(400).json({message:"Invoice doesn't exist"})
    }

    res.status(200).json(estimate)
})

//@desc delete one estimate
//rote PATCH /estimates/myEstimates/:id
//@acces private

const deleteOneEstimate = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }
    const estId = req.params.id

    const deleteEstimate = await Estimate.findByIdAndDelete(estId)

    if( !deleteEstimate ) {
        return res.status(400).json({message:`Estimate with ID:${estId} doesn't exist`})
    }
})




module.exports = {
    getAllEstimates,
    createNewEstimate,
    getAssignedEstimates,
    getOne,
    updateEstimate,
    deleteOneEstimate,
    getCustomersEstimate
}