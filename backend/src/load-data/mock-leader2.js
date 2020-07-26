import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User, Donation, Voucher } from '../repositories'
import { random } from '../services'
import { encrypt } from '../services/encrypt';

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      const timestamp = new Date()

      const login = process.argv.pop()
      const password = encrypt('12345678')
      const email = `mock-${login}@teste.com`
      const role = 'leader'

      const user = await User.create({
        login,
        password,
        email,
        role
      })

      console.log(user._id)

      const site = 'Local'
      const city = 'Contagem'
      const state = 'MG'
      const quantity = 50
      const donor = null
      const status = 1
      const created = timestamp

      const leaderLogin = login

      let donationId

      // First donation with 3 vouchers
      donationId = random.longid() * -1

      await Donation.create({
        donationId,
        leaderLogin,
        site,
        city,
        state,
        quantity,
        donor,
        status,
        created
      })

      for (let j = 0; j < 3; j++) {
        const voucherId = random.longid() * -1

        await Voucher.create({
          voucherId,
          donationId,
          leaderLogin,
          status: 1,
          created: timestamp
        })
      }

      // Second donation with 5 vouchers
      donationId = random.longid() * -1

      await Donation.create({
        donationId,
        leaderLogin,
        site,
        city,
        state,
        quantity,
        donor,
        status,
        created
      })

      for (let j = 0; j < 5; j++) {
        const voucherId = random.longid() * -1

        await Voucher.create({
          voucherId,
          donationId,
          leaderLogin,
          status: 1,
          created: timestamp
        })
      }

      // Third donation with 10 vouchers
      donationId = random.longid() * -1

      await Donation.create({
        donationId,
        leaderLogin,
        site,
        city,
        state,
        quantity,
        donor,
        status,
        created
      })

      for (let j = 0; j < 10; j++) {
        const voucherId = random.longid() * -1

        await Voucher.create({
          voucherId,
          donationId,
          leaderLogin,
          status: 1,
          created: timestamp
        })
      }

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
