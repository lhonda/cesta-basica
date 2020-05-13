import * as Request from 'axios'

import { statusesReport } from '../enums'
import { Report, User } from '../repositories'
import { S3 } from '../services'

export async function listReports () {
  const reports = await Report.find({}).sort({ timestamp: -1 }).exec()
  return reports.map(r => (
    {
      id: r._id,
      status: r.status,
      statusText: statusesReport[r.status],
      timestamp: r.timestamp,
      details: r.details,
      owner: r.owner,
      url: r.url
    }
  ))
}

export async function createReport (entity, filters, login) {
  const { name } = await User.findOne({ login }, { _id: 0, name: 1 })

  try {
    const response = await Request.post(process.env.GATEWAY_URL, {
      entity,
      filters,
      name
    })

    if ([202, 409].includes(response.status)) return response
    return {
      status: 502
    }
  } catch (error) {
    console.log(`Error on GATEWAY Request: ${error.message}`)
    return {
      status: 502
    }
  }
}

export async function getReport ({ id }) {
  try {
    const { key } = await Report.findById(id)
    if (!key) {
      return {
        status: 404,
        message: 'Report not found'
      }
    }

    const signedUrl = await S3.getObjectUrl(key)
    return {
      status: 200,
      signedUrl
    }
  } catch (error) {
    console.log(`Error on getReport: ${error.message}`)
    return {
      status: 500
    }
  }
}
