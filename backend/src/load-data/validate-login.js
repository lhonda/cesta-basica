import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User } from '../repositories'
import path from 'path'
import fs from 'fs'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()
      /**
        *  Validate login as Cpf
      */

      const users = await User.find()
      // console.log(users)

      /*for (const user of users) {
        const { login } = user
        
        // console.log('Checking if user login is valid', await validateLogin(login))
      }*/

      const txtPath = path.resolve('data-to-load', 'invalid-logins')
      // console.log(txtPath)

      fs.writeFile(`${txtPath}`, users, function (err) {
        if (err) throw err
        console.log('Arquivo criado')
      })

      await disconnect()
    } catch (err) {
      console.log(err)
    }
  }())
}
