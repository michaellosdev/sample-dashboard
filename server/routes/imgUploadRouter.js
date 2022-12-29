const router = require('express').Router()

const {upload, edit} = require('../controllers/imgUploadControllers')

const parser = require('../config/cloudinaryConfig')

router.post('/images', parser.single('image'), upload)
router.patch('/images/:id', parser.single('image'),edit )

module.exports = router