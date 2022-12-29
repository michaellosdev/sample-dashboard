const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const estimateSchema = new mongoose.Schema(
    {
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Item'
        }],
        customItems: [{
            name: String,
            itemType: String,
            qty: Number,
            price: Number,
            total: Number

        }],
    totalPrice: {
        type:Number,
        required: true
        },
    discount: {
        type: Number,
        min: 0,
        max:100,
        default:0
        },
    sendToEmails:[{type:String}],
    status: {
        type: String,
        default: 'notSigned',
        enum: ['signed', 'notSigned']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    blueprint: {
        data:Buffer,
        contentType: String
    },
    createdAt:{
        type: Date,
        
    },
    dueDate:{
        type: Date,
        min: Date.now,
    },
},

    {
        timestamps:true
    }

)

estimateSchema.plugin(AutoIncrement, {
    inc_field:'estimate',
    id:'estimateNum',
    start_seq: 2000
})

module.exports = mongoose.model('Estimate', estimateSchema)