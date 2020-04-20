import { S3 } from 'aws-sdk'
const s3 = new S3()

export function upload(Key, Body) {
  return s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}

async function uploadByCursor(Key, Cursor) {
  console.log("UPLOAD")
  let Body;
  try {
    await Cursor
      .eachAsync(async doc => {
        Body += doc.value
      })
    console.log(Body)
    return upload(Key, Body)
  } catch(err) {
    console.error(err)
    throw err
  }
}

function createMultipartUpload(s3, Key) {
  return s3.createMultipartUpload({
    Bucket: process.env.BUCKET_NAME,
    Key,
  }).promise()
}

async function uploadMultipartByCursor(Key, Cursor, batchSize = 9) {
  console.log("MULTIPART")

  let Body = ""
  let count = 0
  let PartNumber = 0
  let uploadParts = []
  try {
    const { UploadId } = await createMultipartUpload(s3, Key)
    await Cursor
      .eachAsync(async doc => {
        if (count === batchSize) {
          console.log(Body)
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
        Body += `${doc.value}\n`
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
  } catch(err) {
    console.error(err)
    throw err
  }
}

export async function uploadCSVReport(Key, cursor) {
  try {
    let bufferSize = 0
    cursor.map(doc => {bufferSize += doc.size; return doc })
    console.log("BUFFER SIZE", bufferSize)

    if (bufferSize >= 5 * 1000 * 1000) {
      return uploadMultipartByCursor(Key, cursor)
    }

    return uploadByCursor(Key, cursor)

  } catch (error) {
    console.error(error)
  }
}