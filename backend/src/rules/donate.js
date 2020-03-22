import { Donation, DonationEvent } from '../repositories/donation'

var AWS = require('aws-sdk')
const BUCKET_NAME = 'cesta-basica-sp'

export async function donate ({ donationId, leaderId, geolocation, quantity, receivedCpf, receivedName, fileContent }) {
  const donation = await Donation.findOne({ donationId })

  console.log(donation)

  if (donation) {
    donation.status = donation.status[2]
    await donation.save()

    var utcNow = new Date()
    var event = new DonationEvent({
      donationId: donationId,
      quantity: quantity,
      leaderId: leaderId,
      status: donation.status,
      donor: donation.donor,
      receivedCpf: receivedCpf,
      receivedName: receivedName,
      timeStamp: utcNow.toISOString(),
      location: geolocation
    })

    console.log(event)

    await event.save()

    var key = `entrega-${donationId}-${utcNow.toISOString()}.jpg`

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

    return {
      donation: donation
    }
  }

  return Promise.reject(new Error('Donation save failed'))
}
