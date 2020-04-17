import ProcFileException from '../../../core/process-file-exception'
import { Donation, fileStatus } from '../../../repositories'

export default async (validDonations) => {
  const mapObject = {}

  validDonations.forEach(donation => {
    if (mapObject[donation.leaderLogin]) {
      return mapObject[donation.leaderLogin].add(donation.donationId)
    }

    mapObject[donation.leaderLogin] = new Set([donation.donationId])
  })

  const countList = Array.from(Object.entries(mapObject))

  const promiseList = countList.map(([key, values]) => {
    return Donation.updateMany(
      { donationId: { $in: Array.from(values) } },
      { $set: { leaderLogin: key } }
    )
  })

  const resolved = await Promise.all(promiseList)

  const errors = []

  resolved.forEach(
    (returned, index) => {
      if (returned.ok !== 1 || returned.n !== countList[index][1].size) {
        return errors.push(countList[index][0])
      }
    }
  )

  if (errors.length > 0) {
    throw new ProcFileException(
      422,
      `Falha ao processar pacote(s) para o(s) novo(s) líder(es) ${errors.join(', ')}`,
      fileStatus.partial
    )
  }

  return { message: `${validDonations.length} pacote(s) atualizado(s) com sucesso.` }
}
