const express = require('express')
const User = require('../../controllers/register/register.controller')

const router = express.Router()

router.post('/create', User.create)

router.post('/connect', User.connect)

router.get('/find/:userId', User.find)

router.delete('/delete/:id', User.delete)

module.exports = router