const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/idex(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = router