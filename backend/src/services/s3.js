import AWS from 'aws-sdk'

export function upload(Key, Body) {
  return new AWS.S3().upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}
