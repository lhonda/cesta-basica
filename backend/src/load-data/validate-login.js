import { promises as fs } from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { User } from '../repositories'
import { validateLogin } from '../services/validateLogin'
import { connect, disconnect } from '../core/database'
import json2xls from 'json2xls'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      const users = await User.find({}, { _id: 0, login: 1, email: 1, name: 1 })
      console.log(`${users.length} users login is about to be verified`)

      const invalidLogins = []

      await Promise.all(users.map(async ({ login, email, name }) => {
        try {
          await validateLogin(login)
        } catch (error) {
          invalidLogins.push({ login, email, name })
        }
      }))

      const xlsxData = json2xls(invalidLogins)
      const xlsxBuffer = Buffer.from(xlsxData, 'binary')
      const xlsxPath = path.resolve('data-to-load', 'invalid-logins.xlsx')
      await fs.writeFile(xlsxPath, xlsxBuffer)

      await disconnect()
    } catch (err) {
      console.log(err)
    }
  }())
}
