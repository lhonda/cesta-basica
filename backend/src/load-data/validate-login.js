import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { User } from '../repositories'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()
      /**
        *  Validate login as Cpf
      */

      await disconnect()
    } catch (err) {
      console.log(err)
    }
  }())
}
