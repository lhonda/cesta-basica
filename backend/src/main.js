import 'dotenv/config'
import { serverless } from './core/server'
import { connect } from './core/database'

(async function main () {
  console.log(new Date(), 'Initializing...')
  try {
    await connect()
    //    await start()
      await serverless()
    console.log(new Date(), `Server up at port ${process.env.PORT}`)
  } catch (error) {
    console.error('Failed to start application', error)
  }
}())
