/* eslint-disable handle-callback-err */
import { S3 } from 'aws-sdk'
import { config } from 'dotenv'
import async from 'async'
import fs from 'fs'
import path from 'path'
import util from 'util'

const s3 = new S3()
let createPartLock = true

export function upload (Key, Body) {
  console.log('UPLOAD')
  return s3.upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}

function progress (progress, max, parts) {
  process.stdout.write(`Progress: ${progress} of ${max} -- ${((progress / max) * 100).toFixed(2)}% (${parts} Parts created)\r`)
}

async function uploadByCursor (Key, result) {
  let Body = ''
  try {
    result.map(async doc => {
      Body += `${doc.value}\n`
    })
    return upload(Key, Body)
  } catch (err) {
    console.error(err)
    throw err
  }
}

function createMultipartUpload (s3, Key) {
  return s3.createMultipartUpload({
    Bucket: process.env.BUCKET_NAME,
    Key
  }).promise()
}

async function createUploadPart (Key, Body, PartNumber, UploadId) {
  if (createPartLock) return
  console.log('Creating Part')
  createPartLock = true
  return await s3.uploadPart({
    UploadId,
    Key,
    Body,
    PartNumber,
    Bucket: process.env.BUCKET_NAME
  }).promise()
}

async function uploadMultipartByCursor (Key, result, totalByteSize) {
  console.log('MULTIPART')

  let uploadedBytes = 0
  let upId
  let Body = ''
  let PartNumber = 0
  const uploadParts = []
  const promises = []
  const megaByteChunks = []
  try {
    return await createMultipartUpload(s3, Key)
      .then(({ UploadId }) => {
        console.log('Comencing Part Upload Creation ...')
        upId = UploadId
        result
          .map(async doc => {
            const bodySize = Buffer.byteLength(Body)
            // Create a megabyte Chunk
            if (bodySize >= 1 * 1000 * 1000) {
              megaByteChunks.push(Body)
              Body = `${doc.value}\n`
            }
            if (megaByteChunks.length >= 5) {
              PartNumber += 1
              // eslint-disable-next-line no-unused-vars
              const chunk = megaByteChunks
              promises.push(createUploadPart(Key, Body, PartNumber, upId).then(part => {
                if (part) {
                  uploadParts.push(part)
                } else {
                  // eslint-disable-next-line no-unused-expressions
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
        console.log('Resolving part creation promises...')
        return Promise.all(promises)
      }).then(() => {
        console.log('Check Body residues ...')
        if (Body.length > 0) {
          PartNumber += 1
          return createUploadPart(Key, Body, PartNumber, upId)
            .then((part) => {
              // eslint-disable-next-line eqeqeq
              console.log('PART EXISTS? ', (part != undefined), part)
              uploadParts.push(part)
            })
        }
      }).then(() => {
        console.log('Sorting parts')
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
  } catch (err) {
    console.error(err)
    throw err
  }
}

function uploadMultipart (absoluteFilePath, fileName, uploadCb) {
  s3.createMultipartUpload({ Bucket: process.env.BUCKET_NAME, Key: fileName }, (mpErr, multipart) => {
    if (!mpErr) {
      // console.log("multipart created", multipart.UploadId);
      fs.readFile(absoluteFilePath, (err, fileData) => {
        const partSize = 1024 * 1024 * 5
        const parts = Math.ceil(fileData.length / partSize)

        async.timesSeries(parts, (partNum, next) => {
          const rangeStart = partNum * partSize
          const end = Math.min(rangeStart + partSize, fileData.length)

          console.log('uploading ', fileName, ' % ', (partNum / parts).toFixed(2))

          partNum++
          async.retry((retryCb) => {
            s3.uploadPart({
              Body: fileData.slice(rangeStart, end),
              Bucket: process.env.BUCKET_NAME,
              Key: fileName,
              PartNumber: partNum,
              UploadId: multipart.UploadId
            }, (err, mData) => {
              retryCb(err, mData)
            })
          }, (err, data) => {
            // console.log(data);
            next(err, { ETag: data.ETag, PartNumber: partNum })
          })
        // eslint-disable-next-line handle-callback-err
        }, (err, dataPacks) => {
          s3.completeMultipartUpload({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            MultipartUpload: {
              Parts: dataPacks
            },
            UploadId: multipart.UploadId
          }, uploadCb)
        })
      })
    } else {
      uploadCb(mpErr)
    }
  })
}

function uploadFile (absoluteFilePath, uploadCb) {
  const fileName = path.basename(absoluteFilePath)
  const stats = fs.statSync(absoluteFilePath)
  const fileSizeInBytes = stats.size

  if (fileSizeInBytes < (1024 * 1024 * 5)) {
    async.retry((retryCb) => {
      // eslint-disable-next-line handle-callback-err
      fs.readFile(absoluteFilePath, (err, fileData) => {
        s3.putObject({
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: fileData
        }, retryCb)
      })
    }, uploadCb)
  } else {
    uploadMultipart(absoluteFilePath, fileName, uploadCb)
  }
}

const uploadFileAsync = util.promisify(uploadFile)

export async function uploadCSVReport (Key, result) {
  try {
    const bufferSize = result.reduce((total, item) => total + item.size, 0)

    console.log('BUFFER SIZE', bufferSize)
    console.log('DOC', result[0])

    let response

    if (bufferSize >= 5 * 1000 * 1000) {
      response = await uploadMultipartByCursor(Key, result, bufferSize)
    } else {
      response = await uploadByCursor(Key, result)
    }

    console.log('Upload Completed')
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function uploadCSVReport2 (Key, result) {
  const bufferSize = Buffer.byteLength(result)
  console.log('BUFFER', bufferSize / 1024 / 1024)
  fs.writeFileSync(Key, result)
  await uploadFileAsync(Key)
  fs.unlinkSync(Key)
  console.log('Upload Completed uploadCSVReport2')
}

/**
 * to test this, call from command line:
 * node -r esm src/services/s3.js
 */
if (require.main === module) {
  (async function () {
    try {
      config()

      const testDataArray = Array(1024 * 1).fill().map((x, i) => i).map(y => Array(1024).fill().map(z => 0).join(''))

      /* old call
      await uploadCSVReport('teste4.txt', testDataArray.map(x => ({
        value: x,
        size: Buffer.byteLength(x)
      })))
      */

      await uploadCSVReport2('teste8.txt', testDataArray.join('\n'))
    } catch (err) {
      console.error(err)
    }
  }())
}
