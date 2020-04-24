const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  status: {
    type: Number,
    enum: [1, 2, 3], // 1 processando 2 processado 3 erro
    required: true
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
  details: String,
  url: String
})

module.exports = !mongoose.modelNames().includes('Report') ? mongoose.model('Report', schema) : mongoose.model('Report')