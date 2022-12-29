const mongoose = require('mongoose')
const bcryprt = require("bcrypt")

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
        
    },
    primaryPhoneNumber: {
        type: String,
        
    },
    secondaryPhoneNumber: String,
    email: {
        type:String,
       
    },
    password: {
        type: String,
    },
    state: {type:String},
    city: {type:String},
    zip: {type:Number},
    street: {type:String},
    unit: {type:String}, 
    company:String,
    companyState: {type:String},
    companyCity: {type:String},
    companyZip: {type:Number},
    companyStreet: {type:String},
    companyUnit: {type:Number},
    referral: {
        type: String,
        
    },
    customerType:{
        type: String,
        default:'single',
       
        enum:['company', 'single']
    },
    role: {
        type: String,
        default:'single',
        
    },
    notes: {
        type: String
    },
    representativeName: String,
    representativeEmail: String,
    representativeContactPhone: String,
    representativeRole: String,
    flagged: {
        type: Boolean,
        default: false
    },

    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Invoice'
    }],
    estimates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Estimate'
    }],

    isActive: {
        type: Boolean,
        default: true
    }
    
})

customerSchema.pre('findOneAndUpdate', async function (next) {
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


module.exports = mongoose.model('Customer', customerSchema)