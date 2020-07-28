import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User } from '../repositories'
import { encrypt } from '../services'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      const login = process.argv[2]
      const name = process.argv[3] || ''
      const plainPassword = process.argv[4] || '12345678'
      const role = 'admin'

      if (!login) {
        console.log('Usage: yarn run load-data-new-admin cpf "full name" password')
        return
      }

      const password = encrypt(plainPassword)

      const newAdmin = {
        login,
        password,
        name,
        role
      }

      await User.create(newAdmin)
      console.log({ ...newAdmin, plainPassword })

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
