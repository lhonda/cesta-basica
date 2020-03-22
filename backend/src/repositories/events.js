import { model, Schema } from 'mongoose'

const schema = new Schema({
  login: {
    type: String,
    unique: true,
    required: [true, 'leaderId is required']
  },
  role: {
    type: String,
    required: [true, 'role is required']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    lowercase: true,
    enum: ['commitment']
  }
})

export const Events = model('Events', schema)
