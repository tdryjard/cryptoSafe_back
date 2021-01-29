const express = require('express')
const Prevision = require('../../controllers/prevision/prevision.controller')

const router = express.Router()

router.get('/find', Prevision.find)

module.exports = router