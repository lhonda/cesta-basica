import { Donation } from '../repositories/donation'

// var AWS = require('aws-sdk')
// const BUCKET_NAME = 'cesta-basica-sp'

export async function receive ({ login, role }, { donationId }, { lat, lon }, fileContent) {
  const donation = await Donation.findOne({ donationId: donationId })

  console.log(donation)

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

    donation.lat = lat
    donation.lon = lon
    donation.status = 'Entregue para líder'
    donation.received = timestamp
    donation.s3Key = s3Key
    await donation.save()

    console.log(donation)

    return
  }

  return Promise.reject(new Error(`Receiving donation ${donationId} failed.`))
}
