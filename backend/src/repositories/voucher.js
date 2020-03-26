import { model, Schema } from 'mongoose'
import { pointSchema } from './pointSchema'

const voucherSchema = new Schema({
  voucherId: {
    type: String,
    required: [true, 'voucherId is required']
  },
  donationId: {
    type: String,
    required: [true, 'donationId is required']
  },
  leaderLogin: {
    type: String,
    required: [true, 'leaderLogin is required']
  },
  created: {
    type: Date
  },
  delivered: {
    type: Date
  },
  receivedCpf: {
    type: String,
  },
  receivedName: {
    type: String,
  },
  cardDonatedS3Key: {
    type: String
  },
  point: pointSchema
})

voucherSchema.pre('save', function (next) {
  this.timestamp = new Date()
  next()
})

export const Voucher = model('Voucher', voucherSchema)
