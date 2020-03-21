import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { router } from './router'

export const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(router)

export const start = () =>
  new Promise(resolve => app.listen(process.env.PORT, () => resolve(app)))
