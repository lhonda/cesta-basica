const { models, model, Schema } = require('mongoose')

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
  owner: String,
  url: String
})

module.exports = models.Report || model('Report', schema)