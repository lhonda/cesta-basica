import { User } from '../repositories'
import { validateLogin } from '../services'

export async function createUser ({ login, password, email, role = 'leader' }) {
  const loginValidated = await validateLogin(login)
  if (!loginValidated) throw new Error('invalid Login')

  const user = await User.create({
    login,
    password,
    email,
    role
  })

  return {
    id: user.id,
    login,
    role: user.role
  }
}
