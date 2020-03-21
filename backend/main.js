import { config } from 'dotenv'
import { start } from './src/core/server'
import { connect } from './src/core/database'

(async function main() {
  try {
    config()
    await connect()
    await start()
    console.log(`Server up at port ${process.env.PORT}`)
  }
  catch(error) {
    console.error('Failed to start application', error)
  }
}())
