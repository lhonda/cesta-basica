import { S3 } from 'aws-sdk'
const Bucket = process.env.BUCKET_NAME

export function upload (Key, Body) {
  return new S3().upload({
    Bucket,
    Key,
    Body
  }).promise()
}

export function remove (Key) {
  return new S3().deleteObject({
    Bucket,
    Key
  }).promise()
}

export function getObjectUrl (Key) {
  return new S3().getSignedUrlPromise('getObject', {
    Bucket,
    Key,
    Expires: process.env.SIGNED_URL_EXPIRATION || 1500 // 25 Minutes
  })
}
