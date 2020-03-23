import * as dotenv from 'dotenv'
import * as server from './core/server'
import * as database from './core/database'

(async function main () {
  try {
    dotenv.config()
    await database.connect()
    await server.start()
    console.log(`Server up at port ${process.env.PORT}`)
  } catch (error) {
    console.error('Failed to start application', error)
  }
}())
