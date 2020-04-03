import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User, Donation, Voucher } from '../repositories'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      /**
       * Trailling spaces on login
       * - users
       * - donations
       * - vouchers
       */

      await Promise.all((await User.find({
        login: /\s$/
      })).map(row => {
        row.login = row.login.trim()
        row.cpf = row.login
        console.log('User', row.login)
        return row.save()
      }))

      await Promise.all((await Donation.find({
        leaderLogin: /\s$/
      })).map(row => {
        row.leaderLogin = row.leaderLogin.trim()
        console.log('Donation', row.leaderLogin)
        return row.save()
      }))

      await Promise.all((await Voucher.find({
        leaderLogin: /\s$/
      })).map(row => {
        row.leaderLogin = row.leaderLogin.trim()
        console.log('Voucher', row.leaderLogin)
        return row.save()
      }))

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
