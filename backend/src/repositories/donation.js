import { model, Schema } from 'mongoose'
import { pointSchema } from './pointSchema'

export const donationSchema = new Schema({
  donationId: {
    type: String,
    unique: true,
    required: [true, 'DonationId is required']
  },
  leaderLogin: {
    type: String,
    required: [true, 'leaderLogin is required']
  },
  site: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required']
  },
  receivedQuantity: {
    type: Number
  },
  donor: {
    type: String
  },
  status: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    required: [true, 'status is required'],
    default: 1
  },
  receivedCardsS3Key: {
    type: String
  },
  created: { type: Date },
  scheduled: { type: Date },
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
