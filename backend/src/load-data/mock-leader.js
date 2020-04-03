import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User, Donation, Voucher } from '../repositories'
import { random } from '../services'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      const timestamp = new Date()

      const login = process.argv.pop()
      const password = '12345678'
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

      for (let i = 0; i < 3; i++) {
        const donationId = random.longid() * -1

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
      }

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
