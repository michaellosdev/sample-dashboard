const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    startJobDate: {
        type: Date
    },
    endJobDate: {
        type: Date
    },
    notes: {
        type: String
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    status: {
        type: String, 
        default: 'inProgress',
        enum: ['inProgress', 'completed', 'canceled']
    }

})

module.exports = mongoose.model('Job', jobSchema)