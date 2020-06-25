const mongoose = require('mongoose')

const screenSchema = new mongoose.Schema({
  title: String,
  src: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Screen', screenSchema)