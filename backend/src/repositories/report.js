import { model, Schema } from 'mongoose'

const schema = new Schema({
  status: {
    type: Number,
    enum: [1, 2, 3],
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

export const Report = model('Report', schema)
