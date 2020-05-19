import { S3 } from 'aws-sdk'

export function upload (Key, Body) {
  return new S3().upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}

export function remove (Key) {
  return new S3().deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key
  }).promise()
}

export function signInUrl (Key) {
  return new S3().getSignedUrl('getObject', {
    Bucket: process.env.BUCKET_NAME,
    Key,
    Expires: 60 * 60 * 24
  })
}
