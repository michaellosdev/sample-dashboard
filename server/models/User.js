const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    regId: {
        type:String,
        required:true
    },

    roles: [{
        type: String,
        default: 'customer',
        required:'true',
        enum: ['admin', 'manager', 'tech', 'customer' ]
    }],

    _customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    _employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    }, 
    active: {
        type: Boolean,
        default: true
    },

 
    
})

module.exports = mongoose.model('User', userSchema)