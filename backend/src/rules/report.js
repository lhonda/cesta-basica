import { statusesReport } from '../enums'

export async function listReports() {
  return {
    reports: [
      {
        status: 1,
        statusText: statusesReport[1],
        timestamp: new Date(),
        details: "Vouchers"
      },
      {
        status: 2,
        statusText: statusesReport[2],
        timestamp: new Date(),
        details: "Users",
        url: "http://samplecsvs.s3.amazonaws.com/Sacramentorealestatetransactions.csv"
      },
      {
        status: 3,
        statusText: statusesReport[3],
        timestamp: new Date(),
        details: "Vouchers"
      }
    ]
  }
}
