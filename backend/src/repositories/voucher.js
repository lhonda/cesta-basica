import { model, Schema } from 'mongoose'

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
  lat: { type: Number },
  lon: { type: Number }
})

voucherSchema.pre('save', function (next) {
  this.timestamp = new Date()
  next()
})

export const Voucher = model('Voucher', voucherSchema)
