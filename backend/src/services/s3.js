import { S3 } from 'aws-sdk'
const s3 = new S3()
let createPartLock = true

export function upload(Key, Body) {
  console.log("UPLOAD")
  return s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}

function progress(progress, max, parts) {
  process.stdout.write(`Progress: ${progress} of ${max} -- ${((progress / max) * 100).toFixed(2)}% (${parts} Parts created)\r`)
}

async function uploadByCursor(Key, result) {
  let Body = "";
  try {
    result.map(async doc => {
        Body += `${doc.value}\n`
      })
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

async function createUploadPart(Key, Body, PartNumber, UploadId) {
  if (createPartLock) return
  console.log("Creating Part")
  createPartLock = true
  return await s3.uploadPart({
    UploadId,
    Key,
    Body,
    PartNumber,
    Bucket: process.env.BUCKET_NAME,
  }).promise()
}

async function uploadMultipartByCursor(Key, result, totalByteSize) {
  console.log("MULTIPART")

  let uploadedBytes = 0
  let upId;
  let Body = ""
  let PartNumber = 0
  let uploadParts = []
  let promises = []
  let megaByteChunks = []
  try {
    return await createMultipartUpload(s3, Key)
      .then(({ UploadId }) => {
        console.log("Comencing Part Upload Creation ...")
        upId = UploadId
        result
          .map(async doc => {
            let bodySize = Buffer.byteLength(Body)
            // Create a megabyte Chunk
            if (bodySize >= 1 * 1000 * 1000) {
              megaByteChunks.push(Body)
              Body = `${doc.value}\n`
            }
            if (megaByteChunks.length >= 5) {
              PartNumber += 1
              let chunk = megaByteChunks
              promises.push(createUploadPart(Key, Body, PartNumber, upId).then(part => {
                if (part) {
                  uploadParts.push(part)
                } else {
                  console.error
                }
              }))
              Body = `${doc.value}\n`
              uploadedBytes += doc.size
              progress(uploadedBytes, totalByteSize, PartNumber)
            } else {
              Body += `${doc.value}\n`
              uploadedBytes += doc.size
              progress(uploadedBytes, totalByteSize, PartNumber)
            }
          })
      }).then(() => {
        console.log("Resolving part creation promises...")
        return Promise.all(promises)
      }).then(() => {
        console.log("Check Body residues ...")
        if (Body.length > 0) {
          PartNumber += 1
          return createUploadPart(Key, Body, PartNumber, upId)
            .then((part) => {
              console.log("PART EXISTS? ", (part != undefined), part)
              uploadParts.push(part)
            })
        }
      }).then(() => {
        console.log("Sorting parts")
        return Promise.resolve(uploadParts.sort((a, b) => a.PartNumber - b.PartNumber))
      }).then(partsSorted => s3.completeMultipartUpload({
        Bucket: process.env.BUCKET_NAME,
        Key,
        MultipartUpload: {
          Parts: partsSorted
        },
        UploadId: upId
      }).promise())
      .catch(err => {
        console.error(err)
        throw err
      })

    // const { UploadId } = await createMultipartUpload(s3, Key)
    // result
    //   .forEach(async doc => {
    //     if (Buffer.byteLength(Body) >= 5 * 1000 * 1000 ) {
    //       PartNumber += 1
    //       console.log(PartNumber)
    //       const part = await createUploadPart(Key, Body, PartNumber, UploadId)
    //       uploadParts.push(part)
    //       Body = ""
    //     }
    //     Body += `${doc.value}\n`
    //   })

    // if (Body.length > 0) {
    //   PartNumber += 1
    //   const part = await createUploadPart(Key, Body, PartNumber, UploadId)
    //   uploadParts.push(part)
    // }

    // const s3Response = await s3.completeMultipartUpload({
    //   Bucket: process.env.BUCKET_NAME,
    //   Key,
    //   MultipartUpload: {
    //     Parts: uploadParts.sort((a, b) => a.PartNumber - b.PartNumber)
    //   },
    //   UploadId
    // }).promise()
    // console.log(s3Response)
    // return s3Response
  } catch(err) {
    console.error(err)
    throw err
  }
}

export async function uploadCSVReport(Key, result) {

  try {
    let bufferSize = 0
    result.map(doc => {bufferSize += doc.size; return doc })
    console.log("BUFFER SIZE", bufferSize)
    console.log("DOC", result[0])

    if (bufferSize >= 5 * 1000 * 1000) {
      return uploadMultipartByCursor(Key, result, bufferSize)
    }

    const response = await uploadByCursor(Key, result)
    console.log("Upload Completed")
    return response

  } catch (error) {
    console.error(error)
  }
}