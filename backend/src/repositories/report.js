import { model, Schema } from 'mongoose'

const schema = new Schema({
  status: {
    type: Number,
    enum: [1, 2, 3],
    required: true
  },
  timestamp: {
    type: Date
  },
  details: String,
  owner: String,
  url: String,
  key: String
})

schema.pre('save', function (next) {
  this.timestamp = new Date()
  next()
})

export const Report = model('Report', schema)
