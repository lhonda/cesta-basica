import { model, Schema } from 'mongoose'
import { pointSchema } from './pointSchema'

const donationSchema = new Schema({
  donationId: {
    type: String,
    unique: true,
    required: [true, 'DonationId is required']
  },
  leaderLogin: {
    type: String,
    required: [true, 'leaderLogin is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  donor: {
    type: String,
    required: [true, 'Donor is required']
  },
  status: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    required: [true, 'status is required'],
    default: 1
  },
  s3Key: {
    type: String
  },
  created: { type: Date },
  received: { type: Date },
  lastDelivery: { type: Date },
  completed: { type: Date },
  strayed: { type: Date },
  point: pointSchema
})

donationSchema.pre('save', function (next) {
  this.created = new Date()
  next()
})

export const Donation = model('Donation', donationSchema)
