const express = require('express')
const router = express.Router()
const { createOrUpdateCV, getCV } = require('../controllers/cv.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/', auth, createOrUpdateCV)
router.get('/:id', auth, getCV)

module.exports = router
