const { model, models, Schema } = require('mongoose')
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const schema = new Schema({
  voucherId: {
    type: String,
    unique: true,
    required: [true, 'voucherId is required']
  },
  donationId: {
    type: String,
    required: [true, 'donationId is required']
  },
  leaderComment: {
    type: String
  },
  status: {
    type: Number,
    enum: [1, 2, 3],
    default: 1
  },
  created: {
    type: Date
  },
  delivered: {
    type: Date
  },
  receivedCpf: {
    type: String
  },
  receivedName: {
    type: String
  },
  receivedContactNumber: {
    type: String
  },
  cardDonatedS3Key: {
    type: String
  },
  point: pointSchema
})

module.exports = models.Voucher || model('Voucher', schema)
