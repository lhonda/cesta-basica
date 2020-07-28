import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User } from '../repositories'
import { encrypt } from '../services/encrypt'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      const login = process.argv.pop()
      const password = encrypt('12345678')
      const email = `mock-${login}@teste.com`
      const role = 'admin'

      await User.create({
        login,
        password,
        email,
        role
      })

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
