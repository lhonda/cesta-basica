import { model, Schema } from 'mongoose'
import { pointSchema } from './pointSchema'

const voucherSchema = new Schema({
  donationId: {
    type: String,
    unique: true,
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
  donor: {
    type: String,
    required: [true, 'Donor is required']
  },
  status: {
    type: String,
    enum: ['Esperando recebimento', 'Entregue para líder', 'Completo', 'Devolvido', 'Extraviado'],
    required: [true, 'status is required'],
    default: 'Esperando recebimento'
  },
  timestamp: {
    type: Date,
    required: [true, 'Timestamp is required']
  },
  receivedCpf: {
    type: String,
    required: [true, 'receivedCpf is required']
  },
  receivedName: {
    type: String,
    required: [true, 'receivedName is required']
  },
  location: pointSchema
})

export const Voucher = model('Voucher', voucherSchema)
