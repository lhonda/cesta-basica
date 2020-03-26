import AWS from 'aws-sdk'
import { Donation, donationSchema } from '../repositories/donation'
import { statuses } from '../enum'

const { BUCKET_NAME } = process.env

export async function receive({ 
  login, 
  donationId, 
  lat, 
  lon, 
  receiveDonationFile 
}) {
  if (!login) {
    throw new Error("login is required")
  }

  if (!donationId) {
    throw new Error("donationId is required")
  }

  if (!lat) {
    throw new Error("lat is required")
  }

  if (!lon) {
    throw new Error("lon is required")
  }

  if (!receiveDonationFile) {
    throw new Error("receiveDonationFile is required")
  }

  const donation = await Donation.findOne({ donationId: donationId })
 
  if (!donation) {
    throw new Error(`Couldn\'t find the Donation with id: ${donationId}`)
  }

  if (donation.leaderLogin === login) {
    throw new Error('The leaderLogin of the donation isn\'t the same of the auth token')
  }

  if (donation) {
    const timestamp = new Date()
    const [, ext] = receiveDonationFile.mimetype.split('/')
    const key = `provas/recebimentos/recebimento-doacao-${login}-${donationId}-${timestamp.toISOString()}.${ext}`
    
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: receiveDonationFile
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

    donation.status = 2
    donation.received = timestamp
    donation.receivedCardsS3Key = key
    donation.point = point
    await donation.save()
    
    return
  }
    
