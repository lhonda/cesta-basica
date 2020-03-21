import { getConnectionState } from '../core/database'

export const numberToTimeString = (n) => n.toString().padStart(2, '0')

export function toHHMMSS(uptime) {
    const uptimeSeconds = Math.round(uptime)
    const hours = Math.floor(uptimeSeconds / 3600)
    const minutes = Math.floor((uptimeSeconds - (hours * 3600)) / 60)
    const seconds = uptimeSeconds - (hours * 3600) - (minutes * 60)

  return `${numberToTimeString(hours)}:${numberToTimeString(minutes)}:${numberToTimeString(seconds)}`
}

export default function healthCheck() {
  return {
    uptime: toHHMMSS(process.uptime()),
    database: {
      connected: getConnectionState().connected
    }
  }
}