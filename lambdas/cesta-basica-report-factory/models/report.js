const { model, modelNames, Schema } = require('mongoose')

const schema = new Schema({
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

module.exports =!modelNames().includes('Report') ? model('Report', schema) : model('Report')
