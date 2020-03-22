import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { User } from '../repositories/user'

export async function signin ({ login, password }) {
  const user = await User.findOne({ login, password: md5(password) })
  console.log(user)
  if (user) {
    const { _id: id, login, role, email } = user
    const token = jwt.sign({ login, role }, process.env.SECRET)

    return {
      user: { id, login, role, email },
      token
    }
  }

  return Promise.reject(new Error('Login fail'))
}
