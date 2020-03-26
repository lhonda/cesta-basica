import { Donation, Voucher } from '../repositories'

// var AWS = require('aws-sdk')
// const BUCKET_NAME = 'cesta-basica-sp'

export async function donate ({
  login,
  role
}, {
  donationId
}, {
  leaderLogin,
  lat,
  lon,
  quantity,
  receivedCpf,
  receivedName
}, fileContent) {
  const donation = await Donation.findOne({ donationId: donationId })

  console.log(donation)

  if (donation) {
    const timestamp = new Date()

    donation.quantity -= quantity

    if (donation.quantity < 0) {
      throw new Error('The quantity specified isn\'t available')
    } else if (donation.quantity === 0) {
      donation.status = 'Completo'
      donation.completed = timestamp
      donation.quantity = 0
    } else {
      donation.status = 'Entregando'
      donation.lastDelivery = timestamp
    }

    await donation.save()

    let s3Key

    // var key = `/provas/entregas/entrega-${donationId}-${utcNow.toISOString()}.jpg`

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

    const voucher = new Voucher({
      donationId,
      quantity,
      leaderLogin,
      receivedCpf,
      receivedName,
      timestamp,
      point: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      s3Key
    })

    console.log(voucher)

    await voucher.save()

    return
  }

  return Promise.reject(new Error(`Donating donation ${donationId} failed.`))
}
