import { Events } from '../repositories/events'

export async function commitment ({ login, role, timestamp, type }) {
  return Events.create({
    login,
    role,
    timestamp,
    type
  })
}
