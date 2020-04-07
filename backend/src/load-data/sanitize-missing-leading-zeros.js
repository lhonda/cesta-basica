import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User, Donation, Voucher } from '../repositories'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      /**
       * Missing leading zeros
       * - users
       * - donations
       * - vouchers
       */

      await Promise.all((await User.find({
        login: /^[0-9]{0,10}$/
      })).map(row => {
        row.login = `00000000000${row.login.trim()}`.slice(-11)
        console.log('User', row.login)
        return row.save()
      }))

      await Promise.all((await Donation.find({
        leaderLogin: /^[0-9]{0,10}$/
      })).map(row => {
        row.leaderLogin = `00000000000${row.leaderLogin.trim()}`.slice(-11)
        console.log('Donation', row.leaderLogin)
        return row.save()
      }))

      await Promise.all((await Voucher.find({
        leaderLogin: /^[0-9]{0,10}$/
      })).map(row => {
        row.leaderLogin = `00000000000${row.leaderLogin.trim()}`.slice(-11)
        console.log('Voucher', row.leaderLogin)
        return row.save()
      }))

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
