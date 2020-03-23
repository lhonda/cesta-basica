import mongoose from 'mongoose'

mongoose.set('useCreateIndex', true)

const status = {
  connected: false
}

export const getConnectionState = () => ({ ...status })

export const connect = () =>
  mongoose.connect(process.env.DBURL)

export const disconnect = () =>
  mongoose.disconnect()

mongoose.connection.on('connected', () => {
  status.connected = true
})

mongoose.connection.on('disconnected', () => {
  status.connected = false
})
