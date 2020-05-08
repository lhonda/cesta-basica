const mongoose = require('mongoose')
const AWS = require('aws-sdk')

const { getConnection } = require('./repository_handler')

AWS.config.region = 'us-east-1'
const lambda = new AWS.Lambda()

let conn;
const ReportModel = require('./report_model')

async function hasProcessingReports(Report) {
  const result = await Report.find({
    status: 1
  })

  return result.length >= 1
}

function validateEvent(event) {
  const body = JSON.parse(event.body)
  return body && body.filters && ['voucher', 'user', 'donation', 'site'].includes(body.entity)
}

exports.handler = async (event, context) => {
  if (!validateEvent(event)) {
    console.error(new Error(`Bad Request: ${JSON.stringify(event.body)}`))
    return { statusCode: 400 }
  }
  const { body } = event

  try {
    conn = await getConnection(conn, context)

    if (await hasProcessingReports(ReportModel)) return { statusCode: 409 }

    return new Promise((resolve, reject) => {
      lambda.invoke({
        FunctionName: 'cesta-basica-report-factory',
        InvocationType: 'Event',
        Payload: JSON.stringify(body)
      }, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve({
            statusCode: data.StatusCode
          })
        }
      })
    })

  } catch(e) {
    console.error(e)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e.message })
    }
  }
}