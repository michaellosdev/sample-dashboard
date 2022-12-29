const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const signinCustomer = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    try {
        const customer = await Customer.findOne({email: email})
        
        if(!customer || !customer.isActive) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    
    const match = await bcrypt.compare(password, customer.password)
    console.log(match, password, customer.password)
    
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
    
    const payload = {
            id:customer._id,
            email: customer.email
        }
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
        {expiresIn:'50m'}, 
        )

        res.cookie(String(customer._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 3000),
            httpOnly: true,
            sameSite:'none',
            secure: true
        })
        
        res.status(200).json({result: customer, token})
    } catch(err) {
        res.status(500).json({ message: "Something went wrong" });
    }

})

module.exports = {signinCustomer}