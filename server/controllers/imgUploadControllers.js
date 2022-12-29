const ImageSchema = require('../models/ImgUpload')
const asyncHandler = require('express-async-handler')

const upload = asyncHandler(async(req, res) => {
    const imgUpload = await ImageSchema.create({
        image: req.file.path
    })

    if(!imgUpload) {
        return res.status(400).json({
            message: 'Image upload failed',
            status: 'Error'
        })
    }

    res.json(req.file.path)
    console.log(imgUpload)
    console.log(req.file)
})

const edit = asyncHandler(async(req, res) => {


    const imgUpdate = await ImageSchema.findOneAndUpdate({image: req.body.image}, {
        image: req.file.path
    }, {new:true})

    if(!imgUpdate) {
        return res.status(400).json({
            message: 'Image upload failed',
            status: 'Error'
        })
    }

    res.json(req.file.path)
    console.log(imgUpdate)
    console.log(req.file)
})

const download = asyncHandler(async(req, res) => {


    const image = img 
})

module.exports = {upload, download, edit}