import express from 'express'
import fileUpload from 'express-fileupload'
import serverless from 'serverless-http'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { databaseConnector } from '../middlewares'
import { router } from './router'

export const app = express()
export const handler = serverless(app)

app.use(express.json())
app.use(fileUpload({
  createParentPath: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(databaseConnector)
app.use(router)

export const start = () =>
  new Promise(resolve => app.listen(process.env.PORT, () => resolve(app)))
