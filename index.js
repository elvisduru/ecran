const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const secret = require('./secret')

const auth = require('./routes/auth')
const verifyToken = require('./verifyToken')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

require('./db')

const whitelist = ['http://localhost:3000/', 'http://localhost:5000/']
app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.get('/api/home', verifyToken, (req, res) => {
  res.send('Welcome!')
})

app.get('/logout', async (req, res) => {
  try {
    res.clearCookie('token')
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.get('/checkToken', verifyToken, (req, res) => res.status(200).send(req.user))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.use(auth)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App is listening on port: ${port}!`))