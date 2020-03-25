import { Donation, donationSchema } from '../repositories/donation'

var AWS = require('aws-sdk')
const BUCKET_NAME = 'cesta-basica-sp'

export async function receive({ login }, { donationId }, { lat, lon }, { doacao }) {

  const donation = await Donation.findOne({ donationId: donationId })
  const status = donationSchema.obj.status.enum[0]

  if (donation && (donation.status === status) && (donation.leaderLogin === login)) {
    const utcNow = new Date()
    const [, ext] = doacao.mimetype.split('/');
    const key = `provas/recebimentos/recebimento-doacao-${login}-${donationId}-${utcNow.toISOString()}.${ext}`

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: doacao.data
    }

    const s3 = new AWS.S3()
    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully.Key:${key}`)
    })
    
    let point = {
      type: 'Point',
      coordinates: [lon, lat]
    }
    
    if (!lat && !lon) {
      point.coordinates[0] = null
      point.coordinates[1] = null
    }

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
