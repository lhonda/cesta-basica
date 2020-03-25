import { Donation, donationSchema } from '../repositories/donation'

var AWS = require('aws-sdk')
const BUCKET_NAME = 'cesta-basica-sp'

export async function receive({ login }, { donationId }, { geolocation }, { doacao }) {

  const donation = await Donation.findOne({ donationId: donationId })
  const status = donationSchema.obj.status.enum[0]

  if (donation && (donation.status === status) && (donation.leaderLogin === login)) {
    const utcNow = new Date()
    const [, ext] = doacao.mimetype.split('/');
    let key = `provas/recebimentos/recebimento-doacao-${login}-${donationId}-${utcNow.toISOString()}.${ext}`

    let params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: doacao.data
    }
    
    let s3 = new AWS.S3()
    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully.Key:${key}`)
    })

    const payload = {
      status: donation.status[1],
      location: geolocation,
      receivedCardsS3Key: key,
      timeStamp: utcNow.toISOString()
    }

    return payload
    // return donation.update(payload)

  }

  return Promise.reject(new Error(`Donation ${donationId} save failed.`))
}