const User = require('../models/User')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const Item = require('../models/Item')
const Invoice = require('../models/Invoice')
const Estimate = require('../models/Estimate')
const asyncHandler = require('express-async-handler')
const bcryprt = require('bcrypt')

//@desc get all users
//@route GET /users
//@access Private

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').populate('_customer').populate('_employee').lean()
    if (!users?.length) {
        return res.status(404).json({message: 'No users found'})
    }

    console.log(users)

    // if(users.roles === 'customer') {
    //     return await users.populate('_customer')
    // } else if(users.roles === 'tech' && users.roles === 'manager') {
    //     return await users.populate('_employee')
    // }

    res.json(users)
})

//@desc create new user
//@route POST /users
//@access Private

const createNewUser = asyncHandler(async (req, res) => {
    const {username, password,regId, roles, _customer, _employee} = req.body

    if(!username || !password) {
        return res.status(400).json({message:'All fields are required'})
    }
    
    const userCustomer =  await Customer.findOne({regId: regId})
    const userEmployee = await Employee.findOne({regId: regId})

    
        if(!regId) {
            return res.status(400).json({message:'yoou need a key'})
        } else if(!userCustomer || !userEmployee) {
            return res.status(400).json({message:`No user with the key ${regId} found`})
        }

    // if(!userRole) {
    //     return res.status(400).json({message:'All fields are required'})
    // }


    // check duplicate 
    const duplicate = await User.findOne({username}).lean().exec()
   
    if (duplicate) {
        return res.status(409).json({message:'This user already exists'})
    }

    //Hash password
    const hashedPwd = await bcryprt.hash(password, 10)

  //  const userObject = {regId, username, "password": hashedPwd, roles}

    // Create and store

    if (userEmployee) {
        await User.create({username, "password": hashedPwd, regId, roles:"tech", _employee: userEmployee?._id})
        res.status(201).json({message: `New employee ${username} created` })
    } else if (userCustomer){
        await User.create({ username, "password": hashedPwd, regId,  roles: "customer", _customer: userCustomer?._id})
        res.status(201).json({message: `New customer ${username} created` })
    }  else {
        res.status(400).json({message:'Invalid user data recieved'})
    }
})

//@desc update a user
//@route PATH /users
//@access Private

const updateUser = asyncHandler(async (req, res) => {
    const {id, username, roles, active, passwords} = req.body

    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message:'User not found'})
    }

    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(400).json({message:"User already exists"})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        user.password = await bcryprt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated`})
})

//@desc delete a user
//@route DELETE /users
//@access Private

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({message: 'User ID Required'})
    }

    const estimates = await Estimate.findOne({user: id}).lean().exec()
    const invoices = await Invoice.findOne({user: id}).lean().exec()
    const properties = await Property.findOne({user: id}).lean().exec()
    if(estimates?.length || invoices?.length || properties?.length) {
        return res.status(400).json({message:'User cannot be deleted'})
    }

    const user = await User.findById(id).exec()


    if (!user) {
        return res.status(400).json({message:'User not found'})
    }

    const result = await user.deleteOne()
    const reply  = `Username ${result.username} with ID ${result._id} deleted `

    res.json(reply)
})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser

}