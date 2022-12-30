const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    primaryPhoneNumber: {
        type: String,
        required: true
    },
    secondaryPhoneNumber: String,
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {type:String},
    city: {type:String},
    zip: {type:Number},
    street: {type:String},
    unit: {type:Number},
    SSN:{
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: 'tech',
        enum:['tech', 'manager', 'admin', 'superuser']
    },
    salary: {
        type: Number,
        required: true  

    },
    notes: {
        type: String, 
    },


    estimates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Estimate'
    }],

    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Invoice'
    }],
    isActive: {
        type: Boolean,
        default: true
    }

    
})

employeeSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }
});


module.exports = mongoose.model('Employee', employeeSchema)