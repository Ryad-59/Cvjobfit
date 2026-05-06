const express = require('express')
const router = express.Router()
const { createOrUpdateCV, getCV, uploadCV } = require('../controllers/cv.controller')
const auth = require('../middlewares/auth.middleware')
const upload = require('../config/upload')

router.post('/', auth, createOrUpdateCV)
router.post('/upload', auth, upload.single('cv'), uploadCV)
router.get('/:id', auth, getCV)

module.exports = router
