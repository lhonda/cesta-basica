import { S3 } from 'aws-sdk'
const s3 = new S3()

export function upload(Key, Body) {
  return s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}

export function createMultipartUpload(s3, Key) {
  return s3.createMultipartUpload({
    Bucket: process.env.BUCKET_NAME,
    Key,
  }).promise()
}

export async function multipartUploadCSVFromCursor(Key, cursor, transformation, batchSize = 9) {
  try {
    const { UploadId } = await createMultipartUpload(s3, Key)

    let Body = ""
    let count = 0
    let PartNumber = 0
    let uploadParts = []
    await cursor.map(transformation).eachAsync(async doc => {
      if (count === batchSize) {
        count = 0
        PartNumber += 1
        const { ETag } = await s3.uploadPart({
          UploadId,
          Key,
          Body,
          PartNumber,
          Bucket: process.env.BUCKET_NAME,
        }).promise()
        uploadParts.push({
          PartNumber,
          ETag
        })
        Body = ""
      }

      Body += `${doc}\n`
      count += 1
    })

    if (Body.length > 0) {
      PartNumber += 1
      const { ETag } = await s3.uploadPart({
        UploadId,
        Key,
        Body,
        PartNumber,
        Bucket: process.env.BUCKET_NAME,
      }).promise()

      uploadParts.push({
        PartNumber,
        ETag
      })
    }

    const result = await s3.completeMultipartUpload({
      Bucket: process.env.BUCKET_NAME,
      Key,
      MultipartUpload: {
        Parts: uploadParts
      },
      UploadId
    }).promise()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}