const express = require('express')
const router = express.Router()
const { saveJobOffer } = require('../controllers/job.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/', auth, saveJobOffer)

module.exports = router
