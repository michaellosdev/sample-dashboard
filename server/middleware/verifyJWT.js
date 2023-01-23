const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')
const Employee = require('../models/Employee')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const verifyJWT = (req, res, next) => {
    const cookies =  req.headers.cookie
    console.log(cookies)
  

    if(!cookies) {
      console.log(res.status(401))
      return res.status(401).json({message: 'Not logged in'})

    }

    let count = 0

    for (let i = 0; i < cookies.length; i++) {

      
      if (cookies.charAt(i) == '=') {
          count += 1;
      }
  }

  
    const token = cookies.split('=')[count]
// const role = req.body.role
    // console.log(token)
//  if(role !== 'admin') return res.json({message: 'no access'})
    if(token){
        jwt.verify(String(token), process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message:"Failed to authenticate"
            })
            req.body.id = decoded.id
            next()
        })
    } else {
        res.json({message:"Incorrect Token Given", isLoggedIn: false})
    }
}

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
      }

      jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${decoded.id}`);
        req.cookies[`${decoded.id}`] = "";
    
        const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "50m",
        });
        console.log("Regenerated Token\n", token);
    
        res.cookie(String(decoded.id), token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 3000), // 50min
          httpOnly: true,
          sameSite: "lax",
        });
    
        req.body.id = decoded.id;
        next();
      });
}

const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${decoded.id}`);
      req.cookies[`${decoded.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };



module.exports = {verifyJWT, refreshToken, logout }