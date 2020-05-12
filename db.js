const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = 'mongodb://localhost:27017/ecran'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log("Connected to Mongo"),
  err => console.log('Error connecting to Mongo: \n', err)
)

module.exports = mongoose.connection