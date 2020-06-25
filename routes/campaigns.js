const express = require('express')
const router = express.Router()
const verifyToken = require('../verifyToken')
const { Screen } = require('../models')
const { fetchScreens } = require('../controllers/admin')

router.use(verifyToken)

router.route('/screens')
  .get(fetchScreens)

module.exports = router