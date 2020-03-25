import { model, Schema } from 'mongoose'
import { pointSchema } from './pointSchema'

const voucherSchema = new Schema({
  donationId: {
    type: String,
    required: [true, 'DonationId is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  leaderLogin: {
    type: String,
    required: [true, 'leaderLogin is required']
  },
  timestamp: {
    type: Date
  },
  receivedCpf: {
    type: String,
    required: [true, 'receivedCpf is required']
  },
  receivedName: {
    type: String,
    required: [true, 'receivedName is required']
  },
  point: pointSchema
})

voucherSchema.pre('save', function (next) {
  this.timestamp = new Date()
  next()
})

export const Voucher = model('Voucher', voucherSchema)
