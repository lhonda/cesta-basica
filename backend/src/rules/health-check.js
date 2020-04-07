import { getConnectionState, isConnected } from '../core/database'

const SECONDS_PER_HOUR = 3600
const MINUTES_PER_HOUR = 60
const SECONDS_PER_MINUTE = 60

export const numberToTimeString = (n) => n.toString().padStart(2, '0')

export function toHHMMSS (uptime) {
  const uptimeSeconds = Math.round(uptime)
  const hours = Math.floor(uptimeSeconds / SECONDS_PER_HOUR)
  const minutes = Math.floor((uptimeSeconds - (hours * SECONDS_PER_HOUR)) / MINUTES_PER_HOUR)
  const seconds = uptimeSeconds - (hours * SECONDS_PER_HOUR) - (minutes * SECONDS_PER_MINUTE)

  return `${numberToTimeString(hours)}:${numberToTimeString(minutes)}:${numberToTimeString(seconds)}`
}

export function healthCheck () {
  return {
    uptime: toHHMMSS(process.uptime()),
    database: {
      connected: isConnected(),
      state: getConnectionState()
    }
  }
}
