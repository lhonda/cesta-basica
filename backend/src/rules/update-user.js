import { User } from '../repositories/user'
import { encrypt } from '../services/encrypt'

export async function updateUser (params) {
  console.log(params)
  let { login, email, password, confirmPassword } = params

  if (!email && !password) {
    throw new Error('Email or password are required')
  }

  const userFDB = await User.findOne({ login })

  if (!userFDB) {
    throw new Error(`User with login ${login} not found`)
  }

  if (email) {
    const newEmail = { $set: { email: email } }

    userFDB.updateOne(newEmail, (err, res) => {
      if (err) throw err
    })

    return {
      message: 'Email updated with success'
    }
  }

  if (password) {
    if (!confirmPassword) {
      throw new Error('Please confirm password')
    }

    if (password !== confirmPassword) {
      throw new Error('Password and confirmed password does not match')
    }

    password = encrypt(password)

    const newPassword = { $set: { password } }

    userFDB.updateOne(newPassword, (err, res) => {
      if (err) throw err
    })

    return {
      message: 'Password updated with success'
    }
  }
}
