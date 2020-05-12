require('dotenv').config()

const express = require('express')
const app = express()

require('./db')

app.get('/api/home', (req, res) => res.send('Welcome!'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App is listening on port: ${port}!`))