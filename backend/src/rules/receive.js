import AWS from 'aws-sdk'
import { Donation } from '../repositories/donation'

export async function receive ({
  login,
  donationId,
  lat,
  lon,
  receivedQuantity,
  receiveDonationFile
}) {
  if (!login) {
    throw new Error('login is required')
  }

  if (!donationId) {
    throw new Error('donationId is required')
  }

  if (!lat) {
    throw new Error('lat is required')
  }

  if (!lon) {
    throw new Error('lon is required')
  }

  if (!receiveDonationFile) {
    throw new Error('receiveDonationFile is required')
  }

  const donation = await Donation.findOne({ donationId: donationId })

  if (!donation) {
    throw new Error(`Could not find the Donation with id: ${donationId}`)
  }

  if (donation.leaderLogin !== login) {
    throw new Error('The leaderLogin of the donation is not the same of the auth token')
  }

  if (donation) {
    const timestamp = new Date()
    const [, ext] = receiveDonationFile.mimetype.split('/')
    const key = `provas/recebimentos/recebimento-doacao-${login}-${donationId}-${timestamp.toISOString()}.${ext}`

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: receiveDonationFile.data
    }

    const s3 = new AWS.S3()

    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully.Key:${key}`)
    })

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
