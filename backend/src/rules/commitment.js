import { Events } from '../repositories'

export async function commitment ({ login, role }) {
  return Events.create({
    login,
    role,
    type: 'commitment'
  })
}