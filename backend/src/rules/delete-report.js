import { Report } from '../repositories'
import { S3 } from '../services'

export async function deleteReport (id) {
  try {
    const report = await Report.findById(id)

    if (report.status === 2) {
      const key = report.url.split('https://cesta-basica-sp.s3.amazonaws.com/')
      try {
        S3.remove(key[1])
      } catch (error) {
        throw new Error(error)
      }
      report.remove()
    }

    if (report.status === 3) {
      report.remove()
    }
  } catch (error) {
    throw new Error(`Não foi possível deletar o relatório com o id ${id}`)
  }
}
