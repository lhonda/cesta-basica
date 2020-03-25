import { Donation, donationSchema } from '../repositories/donation'

var AWS = require('aws-sdk')
const BUCKET_NAME = 'cesta-basica-sp'

export async function receive({ login }, { donationId }, { geolocation }, { cpf }) {

  const donation = await Donation.findOne({ donationId: donationId })
  const status = donationSchema.obj.status.enum[0]
  const [, ext] = cpf.mimetype.split('/');

  if (donation && (donation.status === status) && (donation.leaderLogin === login)) {
    const utcNow = new Date()
    const key = `provas/recebimentos/entrega-${login}-${donationId}-${utcNow.toISOString()}.${ext}`

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: cpf.data
    }

    console.log("HERE");

    let s3 = new AWS.S3()
    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      console.log(`File uploaded successfully.Key:${key}`)
    })

    console.log("sr3 2 ->", s3);

    const payload = {
      status: donation.status[1],
      location: geolocation,
      s3Key: 'Teste',
      // timeStamp: utcNow.toISOString()
    }

    return payload
    // return donation.update(payload)

  }

  return Promise.reject(new Error(`Donation ${donationId} save failed.`))
}