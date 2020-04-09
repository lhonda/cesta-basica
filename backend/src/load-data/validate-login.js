import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { User } from '../repositories'
import { validateLogin } from '../services/validateLogin'
import { connect, disconnect } from '../core/database'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()
      /**
        *  Validate login as Cpf
      */

      const users = await User.find()
      console.log(`${users.length} users login is about to be verified`)

      const invalidLogins = []

      for (const user of users) {
        const { login, email } = user

        try {
          await validateLogin({ login: login })
          // console.log('cpf ok')
        } catch (error) {
          // console.log('invalid')
          const user = JSON.stringify({ login, email })
          invalidLogins.push(user)
          continue
        }
      }

      console.log(`${invalidLogins.length} invalid users login was found`)

      // console.log('Invalid logins')
      // console.log(invalidLogins)

      const txtPath = path.resolve('data-to-load', 'invalid-logins')

      fs.writeFile(`${txtPath}`, invalidLogins, function (err) {
        if (err) throw err
        console.log('File created with success')
      })

      await disconnect()
    } catch (err) {
      console.log(err)
    }
  }())
}
