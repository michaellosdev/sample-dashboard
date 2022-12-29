const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

// Employe signin /employees/login

const signinEmployee = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    try {
        const employee = await Employee.findOne({email: email})
        
        if(!employee || !employee.isActive) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    
    const match = await bcrypt.compare(password, employee.password)
    console.log(match, password, employee.password)
    
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
    
    const payload = {
            id:employee._id,
            email: employee.email,
            role: employee.role
        }
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
        {expiresIn:'50m'}, 
        )

        res.cookie(String(employee._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 3000),
            httpOnly: true,
            sameSite:'none',
            secure: true
        })

        
        res.status(200).json({result: employee, token})
    } catch(err) {
        res.status(500).json({ message: "Something went wrong" });
    }

})




// const signinCustomer =  (req, res)=> {
//     const {email, password} = req.body

    

//     Customer.findOne({email: email})
//         .then(dbCustomer => {
//             if(!dbCustomer) {
//                 return res.json({
//                     message: "Invalid email or password"
//                 })
//             }
//             bcrypt.compare(password, dbCustomer.password)
//             .then(isCorrect => {
//                 console.log(password, dbCustomer.password)
//                 console.log(isCorrect)
//                 if(isCorrect) {
//                         const payload = {
//                             id:dbCustomer._id,
//                             email: dbCustomer.email
//                         }

//                         jwt.sign(
//                             payload,
//                             process.env.JWT_SECRET,
//                             {expiresIn:'7d'},
                            // (err, token) => {
                            //     if(err) return res.json({message: err})
                            //     return res.json({
                            //         message: "Success",
                            //         token: "Bearer " + token 
                            //     })
                            // }
//                         )
//                     } else {
//                         return res.json({
//                             message: "Invalid email or password"
//                         })
//                     }
//                 })

//         })
// }


module.exports ={
    signinEmployee
}