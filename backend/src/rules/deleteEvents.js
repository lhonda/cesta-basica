import { Events } from '../repositories'

export async function deleteEvents ({ login }) {
  return Events.remove({ login })
}
