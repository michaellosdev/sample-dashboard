const User = require('../models/User')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const Item = require('../models/Item')
const Invoice = require('../models/Invoice')
const Estimate = require('../models/Estimate')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


//GET all customers

const getAllCustomers = asyncHandler(async (req, res) => {
    
    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }  
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }



    const customers = await Customer.find().select('-password').populate('invoices').populate('estimates').lean()

    if (!customers.length ) {
        return res.status(404).json({message: "No customers found"})
    }

    


    res.status(200).json(customers)
})


//GET single customer

const getCustomer = asyncHandler(async(req, res) => {
    const id = req.body.id
    
    const isAdmin = await Employee.findById(id)
    const isCustomer = await Customer.findById(id)
    
    //check if admin rights
    if(isAdmin) {
        if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
            return res.status(403).json({message:'Access Denied'})
        } 
        if (isAdmin.role === 'tech') {
            return res.status(403).json({message:'Access Denied'})
        }
    }

    // if(isCustomer) {
    //     return res.status(403).json({message:'Access Denied'})
    // }

    // console.log(isCustomer._id.toString())
    // //check if if customer and req has the same id

    // if(req.params.id !== isCustomer._id.toString()){
    //     return res.status(403).json({message:"Access Denied, Unauthorized"})
    // }

    //find a single customer

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error:'Customer does not exist'})
    }

    const customer = await Customer.findById(req.params.id).select('-password').populate('invoices').populate('estimates').lean()


    if (!customer){
        return res.status(404).json({error:'Customer does not exist'})
    }
    
    res.status(200).json(customer)
})

//create a new customer 

const createCustomer = async (req, res) => {

    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    } 
    
    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }
    
    const takenEmail = await Customer.findOne({email:req.body.email})

    if(takenEmail) {
        return res.status(400).json({message:" This email already taken by another customer"})
    } 

    const hashedPwd = await bcrypt.hash(req.body.password, 10)

    const NewCustomer = { 
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
        company: req.body.company,
        companyState: req.body.state,
        companyCity: req.body.city,
        companyZip: req.body.zip,
        companyStreet: req.body.street,
        companyUnit: req.body.unit,
        referral: req.body.referral,
        customerType: req.body.customerType,
        role: req.body.role,
        notes: req.body.notes,
        representativeName: req.body.representativeName,
        representativeEmail: req.body.representativeEmail,
        representativeContactPhone: req.body.representativeContactPhone,
        representativeRole: req.body.representativeRole,
        flagged: req.body.flagged,
        invoices: [req.body.invoices],
        estimates: [req.body.estimates],
        isActive: req.body.isActive
    }

    try {
        const customer = await Customer.create(NewCustomer)
        return res.status(201).json({message:`customer ${req.body.firstName} creayed`})
        
    } catch (error) {
        return res.status(400).json({error: error.message})
        
    }
}

const deleteCustomer = asyncHandler(async(req, res) => {
     //check if admin rights
     const id = req.body.id
     const isAdmin = await Employee.findById(id)
     if (!isAdmin || isAdmin.role !== 'superuser'){
         return res.status(403).json({message:'Access Denied'})
     }
     if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({message:"Customer doesn't exist"})
    }

    const customer = await Customer.findByIdAndDelete(req.params.id)

    if(!customer) {
        return res.status(400).json({message:"Customer doesn't exist"})
    }

    res.status(200).json(customer)
})

const updateCustomer = asyncHandler(async(req, res) => {
     //check if admin rights
     const id = req.body.id
     const isAdmin = await Employee.findById(id)
     if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
         return res.status(403).json({message:'Access Denied'})
     }
     if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const customer = await Customer.findOne({_id: req.params.id})

    console.log(customer._id)
    if(!customer) {
        return res.status(400).json({ message: 'User not found' })
    }


    // const duplicate = await Customer.findOne({email: req.body.email}).lean()

    // if(duplicate && duplicate?._id.toString() !== req.body.id) {
    //     return res.status(400).json({message:'User Already Exist'})
    // }

    customer.firstName = req.body.firstName,
    customer.lastName = req.body.lastName,
    customer.primaryPhoneNumber = req.body.primaryPhoneNumber,
    customer.secondaryPhoneNumber = req.body.secondaryPhoneNumber,
    customer.email = req.body.email,
    customer.state = req.body.state,
    customer.city = req.body.city,
    customer.zip = req.body.zip,
    customer.street = req.body.street,
    customer.unit = req.body.unit,
    customer.company = req.body.company,
    customer.companyState = req.body.state,
    customer.companyCity = req.body.city,
    customer.companyZip = req.body.zip,
    customer.companyStreet = req.body.street,
    customer.companyUnit = req.body.unit,
    customer.referral = req.body.referral,
    customer.customerType = req.body.type,
    customer.role = req.body.role,
    customer.notes = req.body.notes,
    customer.representativeName = req.body.representativeName,
    customer.representativeEmail = req.body.representativeEmail,
    customer.representativeContactPhone = req.body.representativeContactPhone,
    customer.representativeRole = req.body.representativeRole,
    customer.flagged = req.body.flagged,
    customer.invoices = [req.body.invoices],
    customer.estimates = [req.body.estimates],
    customer.isActive = req.body.isActive
    

        if (req.body.password) {
            // Hash password 
            customer.password = await bcrypt.hash(req.body.password, 10) // salt rounds 
        }
        
        const updateCustomer = await customer.save()


   // const customer = await Customer.findOneAndUpdate({_id: req.params.id}, updateCustomer)

    

    res.status(200).json(customer)
})

const updateCustomerFlagged = asyncHandler(async(req, res) => {
    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }
    
   const customer = await Customer.findOne({_id: req.params.id})

   console.log(customer._id)
   if(!customer) {
       return res.status(400).json({ message: 'User not found' })
   }


   // const duplicate = await Customer.findOne({email: req.body.email}).lean()

   // if(duplicate && duplicate?._id.toString() !== req.body.id) {
   //     return res.status(400).json({message:'User Already Exist'})
   // }

   
   customer.flagged = req.body.flagged
  
   const updateCustomer = await customer.save()


  // const customer = await Customer.findOneAndUpdate({_id: req.params.id}, updateCustomer)

   

   res.status(200).json(customer)
})

const signinCustomer =  (req, res)=> {
    const {email, password} = req.body

    

    Customer.findOne({email: email})
        .then(dbCustomer => {
            if(!dbCustomer) {
                return res.json({
                    message: "Invalid email or password"
                })
            }
            bcrypt.compare(password, dbCustomer.password)
            .then(isCorrect => {
                console.log(password, dbCustomer.password)
                console.log(isCorrect)
                if(isCorrect) {
                        const payload = {
                            id:dbCustomer._id,
                            email: dbCustomer.email
                        }

                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn:'7d'},
                            (err, token) => {
                                if(err) return res.json({message: err})
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token 
                                })
                            }
                        )
                    } else {
                        return res.json({
                            message: "Invalid email or password"
                        })
                    }
                })

        })
}


//@desc get my info for customer 
//@route GET customers/myInfo
//@access private






module.exports = {
    getAllCustomers,
    getCustomer,
    createCustomer,
    deleteCustomer,
    updateCustomer,
    updateCustomerFlagged,


}