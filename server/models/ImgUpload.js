const mongoose = require('mongoose')

const ImgUpload = new mongoose.Schema({
    image : {
        type: String
    }
})

module.exports = mongoose.model('imageUpload', ImgUpload)