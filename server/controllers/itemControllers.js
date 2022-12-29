const User = require('../models/User')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const Item = require('../models/Item')
const Invoice = require('../models/Invoice')
const Estimate = require('../models/Estimate')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

//@desc get all items
//@route GET /items
//@acces private

const getAllItems = asyncHandler(async(req, res) => {
    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const items = await Item.find()
    if(!items?.length) {
        return res.status(404).json({message:'No items found'})
    }

    res.json(items)
})

//@desc create new item
//@route POST /items
//@access private

const createNewItem = asyncHandler(async(req, res) => {
    //check if admin rights
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const newItem = {
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        cost: req.body.cost,
        price: req.body.price,
        inStockQty: req.body.inStockQty,
        description: req.body.description,
        img: req.body.img
    }

    try {
        const item = await Item.create(newItem)
        return res.status(201).json(item)
    } catch(err) {
        return res.status(400).json(err)
    }
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

    console.log(req.params.id)

    const oneItem = await Item.findById(req.params.id)
    if (!oneItem) {
        return res.status(404).json({message:'No items found'})
    }



    res.json(oneItem)
})

const deleteOneItem = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    const itemId = mongoose.Types.ObjectId(req.params.id) 

    const deleteItem = await Item.findByIdAndDelete(itemId)

    if( !deleteItem ) {
        return res.status(400).json({message:`Item with ID:${itemId} doesn't exist`})
    }
})

const updateItem = asyncHandler(async (req, res) => {
    //check if admin 
    const id = req.body.id
    const isAdmin = await Employee.findById(id)
    if ((!isAdmin && isAdmin.role !== 'admin')|| (!isAdmin && isAdmin.role !== 'superuser') ){
        return res.status(403).json({message:'Access Denied'})
    }

    if (isAdmin.role === 'tech') {
        return res.status(403).json({message:'Access Denied'})
    }

    
    
    const itemId = mongoose.Types.ObjectId(req.params.id)

    const item = await Item.findByIdAndUpdate({_id: itemId},{
        $set: req.body
    },
    { new: true, upsert: false, remove: {}, fields: {}, strict:false })

    if(!item) {
        return res.status(400).json({message:"Item doesn't exist"})
    }

    res.status(200).json(item)
})

module.exports = {
    getAllItems,
    createNewItem,
    getOne,
    deleteOneItem,
    updateItem
}