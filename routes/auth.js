const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const user = {
  username: 'admin',
  password: 'password'
}

router.post('/login', (req, res) => {
  // Send user details to Potilon here


})