import { Donation, donationSchema } from '../repositories/donation'

var AWS = require('aws-sdk')
const BUCKET_NAME = 'cesta-basica-sp'

export async function receive({ login }, { donationId }, { lat,lon }, { doacao }) {

  const donation = await Donation.findOne({ donationId: donationId })
  const status = donationSchema.obj.status.enum[0]

<<<<<<< HEAD
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
      timeStamp: utcNow.toISOString(),
      point = {
        type: 'Point',
        coordinates: [lon, lat]
      }
    }

    return payload
    // return donation.update(payload)
=======
  if (donation) {
    const timestamp = new Date()
    let s3Key

    // var key = `/provas/recebimentos/entrega-${donationId}-${utcNow.toISOString()}.jpg`

    // const params = {
    //   Bucket: BUCKET_NAME,
    //   Key: key,
    //   Body: fileContent
    // }

    // var s3 = new AWS.S3()

    // s3.upload(params, function (err, data) {
    //   if (err) {
    //     throw err
    //   }
    //   console.log(`File uploaded successfully.Key:${key}`)
    // })

    donation.point = {
      type: 'Point',
      coordinates: [lon, lat]
    }

    donation.status = 'Entregue para líder'
    donation.received = timestamp
    donation.s3Key = s3Key
    await donation.save()

    console.log(donation)
>>>>>>> develop

  }

  return Promise.reject(new Error(`Donation ${donationId} save failed.`))
}