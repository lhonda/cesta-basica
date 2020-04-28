import * as Request from 'axios'

import { statusesReport } from '../enums'
import { Report } from '../repositories'

export async function listReports () {
  const reports = await Report.find({}).sort({ timestamp: -1 }).exec()
  return reports.map(r => (
    {
      status: r.status,
      statusText: statusesReport[r.status],
      timestamp: r.timestamp,
      details: r.details,
      url: r.url
    }
  ))
}

export async function createReport (entity, filters) {
  try {
    const response = await Request.post(process.env.GATEWAY_URL, {
      entity,
      filters
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
