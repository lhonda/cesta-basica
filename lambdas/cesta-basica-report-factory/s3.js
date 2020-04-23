const { S3 } = require('aws-sdk')

function upload(Key, Body) {
  console.log("BODY", Body)
  return new S3().upload({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body
  }).promise()
}

async function uploadReport(entity, transformation) {
  try {
    const { data } = transformation
    const Key = `${process.env.BUCKET_REPORT_PATH}/${entity}_${new Date().toISOString()}.csv`

    // if (data.byteSize >= 5 * 1000 * 1000) {
    //   return uploadMultipartByCursor(Key, data, byteSize)
    // }

    const response = await upload(Key, data)
    return response
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  uploadReport
}