const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
    {
    itemName: {type: String, required: true},
    itemType: {type:String},
    cost: {type: Number, required: true},
    price:{type: Number, required: true},
    inStockQty :{type: Number},
    description: {type: String},
    img:{type: String}
    },
    {
        timestamps:true
    }

)

module.exports = mongoose.model('Item', itemSchema)