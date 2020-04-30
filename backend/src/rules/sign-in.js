import jwt from 'jsonwebtoken'
import { encrypt } from '../services'
import { User } from '../repositories'

export async function signin ({ login, password }) {
  const user = await User.findOne({ login, password: encrypt(password) })

  if (user) {
    const { _id: id, login, role, email, name } = user
    const token = jwt.sign({ id, login, role }, process.env.SECRET)

    return {
      user: { id, login, role, email, name },
      token
    }
  }

  return Promise.reject(new Error('Login have failed'))
}
