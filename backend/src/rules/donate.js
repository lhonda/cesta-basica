import { Donation, Voucher } from '../repositories'
import { S3 } from '../services'

export async function donate ({
  login,
  donationId,
  voucherId,
  lat,
  lon,
  delivered,
  receivedCpf,
  receivedName,
  receivedContactNumber,
  leaderComment,
  donateDonationFile
}) {
  console.log(arguments)

  const timestamp = new Date()

  /**
   * Validations
   */
  if (!donationId) {
    throw new Error('A variável donationId deve ser preenchida')
  }

  if (!voucherId) {
    throw new Error('A variável voucherId deve ser preenchida')
  }

  if (!lat) {
    throw new Error('A variável lat deve ser preenchida')
  }

  if (!lon) {
    throw new Error('A variável lon deve ser preenchida')
  }

  if (delivered === undefined) {
    throw new Error('A variável delivered deve ser preenchida')
  }

  const donation = await Donation.findOne({ donationId: donationId })

  if (!donation) {
    throw new Error(`Não foi possível achar a doação com o id: ${donationId}`)
  }

  const voucher = await Voucher.findOne({ voucherId })

  if (!voucher) {
    throw new Error(`Não foi possível achar o cartão com o id: ${voucherId}`)
  }

  if (donation.leaderLogin !== login) {
    throw new Error('O líder associoado à essa doação não corresponde com o token autenticado')
  }

  /**
   * Not delivered
   */
  if (delivered === false || delivered === 'false') {
    if (!leaderComment) {
      throw new Error('A variável leaderComment deve ser preenchida')
    }
    voucher.status = 3
    voucher.leaderComment = leaderComment
    voucher.delivered = timestamp
    voucher.point = {
      type: 'Point',
      coordinates: [lon, lat]
    }

    await voucher.save()
    return
  } else if (delivered !== true && delivered !== 'true') {
    throw new Error('A variável delivered deve ser um valor boolean')
  }

  /**
   * More validations when delivered = true
   */
  if (!receivedName) {
    throw new Error("A variável receivedName é obrigatória quando a variável delivered tem o valor 'true'")
  }

  if (!donateDonationFile) {
    throw new Error("A variável donateDonationFile é obrigatória quando a variável delivered tem o valor 'true'")
  }

  /**
   * S3 Upload
   */
  const [, ext] = donateDonationFile.mimetype.split('/')
  const key = `provas/entregas/entrega-doacao-${login}-${donationId}-${timestamp.toISOString()}.${ext}`

  await S3.upload(key, donateDonationFile.data)

  /**
   * Persisting information do mongodb
   */
  donation.status = 3
  donation.lastDelivery = timestamp

  voucher.receivedCpf = receivedCpf
  voucher.status = 2
  voucher.receivedName = receivedName
  voucher.receivedContactNumber = receivedContactNumber
  voucher.delivered = timestamp
  voucher.cardDonatedS3Key = key
  voucher.point = {
    type: 'Point',
    coordinates: [lon, lat]
  }

  console.log(donation)
  console.log(voucher)

  await donation.save()
  await voucher.save()
}
