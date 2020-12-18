import express from 'express'
import fileUpload from 'express-fileupload'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { genericErrorHanlder } from '../middlewares'
import { router } from './router'

const express = require('serverless-express/express')

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({ createParentPath: true }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(router)
app.use(genericErrorHanlder)

const handler = require('serverless-express/handler')

module.exports.api = handler(app)
// export const start = () =>
//   new Promise(resolve => app.listen(process.env.PORT, () => resolve(app)))
module.exports = app
//module.exports.handler = serverless(app);
