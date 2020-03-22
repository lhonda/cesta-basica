import { User } from '../repositories/user'

export async function signup ({ login, password, email }) {
  const user = await User.create({
    login,
    password,
    email,
    role: 'user'
  })

  return {
    id: user.id,
    login,
    role: user.role
  }
}
