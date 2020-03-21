import mongoose from 'mongoose'

const status = {
  connected: false
}

export const getConnectionState = () => ({ ...status })

export const connect = () =>
  mongoose.connect(process.env.DBURL)

mongoose.connection.on('connected', () => {
  status.connected = true
})

mongoose.connection.on('disconnected', () => {
  status.connected = false
})
