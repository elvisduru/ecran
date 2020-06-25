const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || require('../secret')

const user = {
  username: 'admin',
  password: 'password'
}

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    // Send user details to Potilon here

    if (!username || !password) {
      throw 'Something is wrong with your input!'
    }

    if (username !== user.username || password !== user.password) {
      throw 'Incorrect username or password!'
    }

    const payload = { username }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true }).sendStatus(200)

  } catch (err) {
    console.log(err)
    res.status(401).json({ error: 'Incorrect email or password' })
  }
})

module.exports = router