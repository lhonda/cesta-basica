import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { process as processUser } from './user'
import { process as processDonation } from './donation'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      await processUser()
      await processDonation()

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
