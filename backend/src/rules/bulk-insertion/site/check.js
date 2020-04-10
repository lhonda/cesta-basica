import ProcFileException from '../../../core/process-file-exception'
import { Site, fileStatus } from '../../../repositories'

const siteMapFunc = (site) => site.siteId

export default async (validSites) => {
  const toBeAddedDocs = validSites.map(siteMapFunc)

  const existingSites = await Site.find({ siteId: { $in: toBeAddedDocs } }, 'siteId')

  if (existingSites.length > 0) {
    throw new ProcFileException(
      422,
      `Site(s) já existente(s) no sistema ${existingSites.map(siteMapFunc).join(', ')}`,
      fileStatus.duplicated
    )
  }

  return validSites
}
