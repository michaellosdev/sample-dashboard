require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs');
const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser')
const path = require('path')
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const {logEvents} = require('./middleware/logger')
const Message = require('./models/Message')
const PORT = process.env.PORT || 6001

const app = express()

//middleware 

connectDB()
app.use(logger)
app.use(cors(corsOptions))
app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', 'https://sampledash.onrender.com');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);    
    next();
});
app.use(express.json())
app.use(cookieParser())     

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set EJS as templating engine 
app.set("view engine", "ejs");

// routing

app.use(express.static(path.join(__dirname, './../client/build')))
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname + './../client/build/index.html'))
})

app.use('/employees', require('./routes/employeeRoutes'))
app.use('/customers', require('./routes/customerRoutes'))
app.use('/invoices', require('./routes/invoiceRoutes'))
app.use('/myInvoices', require('./routes/invoiceRoutesCustomer'))
app.use('/myEstimates', require('./routes/estimateRoutesCustomer'))
app.use('/items', require('./routes/itemRoutes'))
app.use('/estimates', require('./routes/estimateRoutes'))
app.use('/jobs', require('./routes/jobsRoutes'))
app.use('/myJobs', require('./routes/myJobsRoutes'))
app.use('/api', require('./routes/imgUploadRouter'))

//404 page


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message:'404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

mongoose.connection.once('open', ()=>{
    console.log('Connected to DB')
    app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
