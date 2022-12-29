const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie
    const prevToken = cookies.split('=')[1]

    if(!prevToken) {
        return res.status(400).json({messahe: 'token not found'})
    }

    jwt.verify(String(prevToken).proccess.env.JWT_SECRET, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(403).json({message: 'Authentification failed'})
        }
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = ""

        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:'50m'}
        )

        res.cookie(String(user.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 3000),
            httpOnly: true,
            sameSite:'lax'
        })

        req.id = user.id
    })
}

module.export = refreshToken