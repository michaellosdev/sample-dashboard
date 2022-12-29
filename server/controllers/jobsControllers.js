const mongoose = require('mongoose')
const Job = require('../models/Jobs')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const asyncHandler = require('express-async-handler')
const bcryprt = require('bcrypt')


const getAllJobs = asyncHandler(async(req, res) => {
    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const jobs = await Job.find().populate('employee').populate('customer').populate('invoice')
    if (!jobs.length) {
        return res.status(404).json({message:'No jobs found'})
    }



    res.json(jobs)

})

const createNewJob = asyncHandler(async (req, res) => {
    //check if admin
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    } 

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }


    const newJob = {
       startJobDate: req.body.startJobDate,
       endJobDate: req.body.endJobDate,
       notes: req.body.notes, 
       employee: req.body.employee,
       customer:req.body.customer,
       invoice: req.body.invoice,
       status: req.body.status
    }
 
    
    try {
        const job = await Job.create(newJob)
        return res.status(201).json(job)
    } catch (err) {
        return res.status(400).json(err)

    }
})

const getAssignedJobs = asyncHandler(async(req, res) => {
    const id = req.body.id
    console.log(id)
    const JobsIds = []

    const employees = await Employee.findById(id)
    const customers = await Customer.findById(id)

    // if(jobs.employee._id === id) {

    // }

    // const allInvoices = await Invoice.find()

    //check if its employee

    if(employees) {
        if (!employees) {
            res.status(400).json({message: 'No employees found'})
        } else {
            const employeeJobs = await Job.find({employee: id}).populate('customer').populate('employee').populate('invoice')
            if(!employeeJobs){
                return res.status(400).json({message: 'No jobs found'})
            }
            res.status(200).json(employeeJobs)
        }   
    } 

    //check if its customer
 
    if(customers) {
        if (!customers) {
           return res.status(400).json({message: 'No customers found'})
        } else {
            const customerJobs = await Job.find({customer: id}).populate('customer').populate('employee').populate('invoice')
            if(!customerJobs){
                return res.status(400).json({message: 'No jobs found'})
            }
            res.status(200).json(customerJobs)
        }
    }

    // const a =  await Job.find({customer: req}).populate('customer').populate('employee').populate('invoice')
            

    // const invoices = await Invoice.find({'_id': {$in: invIds}}).populate('employee').populate('customer').populate('items')
    // if (!a.length) {
        
    //     return res.status(400).json({message: 'No invoices found'})
    // } 


    // res.status(200).json(a)
})

const getOne = asyncHandler(async(req, res) => {
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    } 


    const oneJob = await Job.findById(req.params.id).populate('employee').populate('customer').populate('invoice')
    if (!oneJob) {
        return res.status(404).json({message:'Job is not found'})
    }



    res.json(oneJob)
})

const getEmployeesJob = asyncHandler(async(req, res) => {
    const id = req.body.id
    // const one =  await Invoice.find({customer: id}).populate('customer').populate('employee')
    // if (!isAdmin || isAdmin?.role !== 'admin'){
    //     return res.status(403).json({message:'Access Denied'})
    // } 

    

    const oneJob = await Job.findById(req.params.id).populate('employee').populate('customer').populate('invoice')
    //check if find inv.customer equal to 
    if(oneJob.tech.id !== id) {
        return res.status(401).json({message:"You don't have access to this job"})
    }

    if (!oneJob) {
        return res.status(404).json({message:'No invoices found'})
    }
    res.json(oneJob)
})

const updateJob = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }
    
    const jobId = req.params.id

    const job = await Job.findByIdAndUpdate({_id: jobId},{
        $set: req.body
    },
    { new: true, upsert: false, remove: {}, fields: {}, strict:false })

    if(!job) {
        return res.status(400).json({message:"Invoice doesn't exist"})
    }

    res.status(200).json(job)
})


const deleteOneJob = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const jobId = req.params.id

    const deleteJob = await Job.findByIdAndDelete(jobId)

    if( !deleteJob ) {
        return res.status(400).json({message:`Invoice with ID:${jobId} doesn't exist`})
    }
})

module.exports = {
    getAllJobs,
    getAssignedJobs,
    createNewJob,
    getOne,
    updateJob,
    deleteOneJob
}