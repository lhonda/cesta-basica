import { model, Schema } from 'mongoose'
import md5 from 'md5'

const schema = new Schema({
  login: {
    type: String,
    unique: true,
    required: [true, 'login is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  email: {
    type: String,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: [true, 'role is required']
  }
})

schema.pre('save', function (next) {
  this.password = md5(this.password)
  next()
})

export const User = model('User', schema)
