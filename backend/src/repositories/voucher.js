import { model, Schema } from 'mongoose'
import { pointSchema } from './pointSchema'

const voucherSchema = new Schema({
  voucherId: {
    type: String,
    unique: true,
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
  cardDonatedS3Key: {
    type: String
  },
  point: pointSchema
})

voucherSchema.pre('save', function (next) {
  this.created = new Date()
  next()
})

export const Voucher = model('Voucher', voucherSchema)
