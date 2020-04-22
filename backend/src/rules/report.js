import { statusesReport } from '../enums'
import { reportFilter, reportData } from '../rules'

export async function listReports () {
  return [
    {
      status: 1,
      statusText: statusesReport[1],
      timestamp: new Date(),
      details: 'Vouchers'
    },
    {
      status: 2,
      statusText: statusesReport[2],
      timestamp: new Date(),
      details: 'Users',
      url: 'http://samplecsvs.s3.amazonaws.com/Sacramentorealestatetransactions.csv'
    },
    {
      status: 3,
      statusText: statusesReport[3],
      timestamp: new Date(),
      details: 'Vouchers'
    }
  ]
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

  const filters = reportFilter(entity, body)
  const data = reportData(entity, filters)

  return data
}
}
