import AWS from 'aws-sdk'
import { Donation, donationSchema } from '../repositories/donation'

const { BUCKET_NAME } = process.env

export async function receive ({ login, donationId, lat, lon, donationFiles }) {
  const donation = await Donation.findOne({ donationId: donationId })
  const status = donationSchema.obj.status.enum[0]

  if (donation && (donation.status === status) && (donation.leaderLogin === login)) {
    const utcNow = new Date()
    const [, ext] = donation.mimetype.split('/')
    const key = `provas/recebimentos/recebimento-doacao-${login}-${donationId}-${utcNow.toISOString()}.${ext}`

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: donationFiles.data
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

    if (!lat && !lon) {
      point.coordinates[0] = null
      point.coordinates[1] = null
    }

    donation.status = 2
    donation.received = utcNow
    donation.s3Key = key
    await donation.save()

    const payload = {
      status: donationSchema.obj.status.enum[1],
      receivedCardsS3Key: key,
      timeStamp: utcNow.toISOString(),
      point: point
    }

    return donation.update(payload)
  }

  return Promise.reject(new Error(`Donation ${donationId} save failed.`))
}
