import { Donation } from '../repositories/donation'
import { S3 } from '../services'

export async function receive ({
  login,
  donationId,
  lat,
  lon,
  receivedQuantity,
  receiveDonationFile
}) {
  console.log(arguments)

  if (!login) {
    throw new Error('A variável login deve ser preenchida')
  }

  if (!donationId) {
    throw new Error('A variável donationId deve ser preenchida')
  }

  if (!lat) {
    throw new Error('A variável lat deve ser preenchida')
  }

  if (!lon) {
    throw new Error('A variável lon deve ser preenchida')
  }

  if (!receiveDonationFile) {
    throw new Error('A variável receiveDonationFile deve ser preenchida')
  }

  const donation = await Donation.findOne({ donationId: donationId })

  if (!donation) {
    throw new Error(`Não foi possível achar nenhuma doaçao com o id: ${donationId}`)
  }

  if (donation.leaderLogin !== login) {
    throw new Error('O líder associoado à essa doação não corresponde com o token autenticado')
  }

  if (donation) {
    const timestamp = new Date()
    const [, ext] = receiveDonationFile.mimetype.split('/')
    const key = `provas/recebimentos/recebimento-doacao-${login}-${donationId}-${timestamp.toISOString()}.${ext}`

    await S3.upload(key, receiveDonationFile.data)

    const point = {
      type: 'Point',
      coordinates: [lon, lat]
    }

    donation.receivedQuantity = receivedQuantity
    donation.status = 2
    donation.received = timestamp
    donation.receivedCardsS3Key = key
    donation.point = point
    await donation.save()

    return donation
  }
}
