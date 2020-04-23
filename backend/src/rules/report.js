import { statusesReport } from '../enums'
import { Report } from '../repositories'

export async function listReports () {
  const reports = await Report.find({})
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

export async function createReport (entity, body) {

  /**
   * entity = (voucher, donation, users, sites)
   * Filtros
   */

  /**
    * 201 = Created (se processo foi inidicado)
    * 409 = Conflict (se existe um processo sendo processado)
    */

}
