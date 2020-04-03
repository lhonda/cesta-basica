import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { Donation, Voucher } from '../repositories'
import csvtojson from 'csvtojson'
import path from 'path'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      /**
       * Transfer donations to a new leader
       */

      const csvPath = path.resolve('data-to-load', 'transfer-donations.csv')
      const rows = await csvtojson().fromFile(csvPath)

      await Promise.all(rows.map(async row => {
        const { donationId, newLeaderLogin } = row

        console.log(`DonationId: ${donationId}, processing, newLeaderLogin: ${newLeaderLogin}`)

        const donation = await Donation.findOne({ donationId })

        if (!donation) {
          console.log(`DonationId: ${donationId}, could not find the donation`)
          process.exit(1)
        }

        console.log(`DonationId: ${donationId}, currentLeaderLogin: ${donation.leaderLogin}`)

        const vouchers = await Voucher.find({ donationId: donation.donationId })

        console.log(`DonationId: ${donationId}, vouchers.length: ${vouchers.length}`)

        await Promise.all(vouchers.map(async voucher => {
          console.log(`DonationId: ${donationId}, voucherId: ${voucher.voucherId} from leaderLogin: ${voucher.leaderLogin} to ${newLeaderLogin}`)
          voucher.leaderLogin = newLeaderLogin
          return voucher.save()
        }))

        console.log(`DonationId: ${donationId}, from leaderLogin: ${donation.leaderLogin} to ${newLeaderLogin}`)
        donation.leaderLogin = newLeaderLogin
        return donation.save()
      }))

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
