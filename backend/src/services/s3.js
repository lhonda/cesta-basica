import { S3 } from 'aws-sdk'

export function upload(Key, Body) {
  return new S3().upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}