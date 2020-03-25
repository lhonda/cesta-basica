import { Donation, Voucher } from '../repositories'

var AWS = require('aws-sdk')
const BUCKET_NAME = 'cesta-basica-sp'

export async function donate ({
  donationId,
  leaderLogin,
  geolocation,
  quantity,
  receivedCpf,
  receivedName,
  fileContent
}) {
  const donation = await Donation.findOne({ donationId: donationId })

  console.log(donation)

  if (donation) {
    donation.status = 'Entregando'
    await donation.save()

    var utcNow = new Date()
    var key = `/provas/entregas/entrega-${donationId}-${utcNow.toISOString()}.jpg`

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent
    }

    var s3 = new AWS.S3()
    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully.Key:${key}`)
    })

    var voucher = new Voucher({
      donationId: donationId,
      quantity: quantity,
      leaderLogin: leaderLogin,
      status: donation.status,
      donor: donation.donor,
      receivedCpf: receivedCpf,
      receivedName: receivedName,
      timeStamp: utcNow,
      location: geolocation,
      s3Key: key
    })

    console.log(voucher)

    await voucher.save()

    return
  }

  return Promise.reject(new Error(`Donating donation ${donationId} failed.`))
}
