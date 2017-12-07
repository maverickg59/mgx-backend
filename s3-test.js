const Minio = require('minio')
const uuidv4 = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const s3Client = new Minio.Client({
  endPoint:  's3.amazonaws.com',
  secure: true,
  accessKey: 'AKIAILRSW7JDKJAWIAXQ',
  secretKey: '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'
})

// const file = path.resolve('./package.json')

module.exports = uploadFile

function uploadFile(file, callback) {
  let uploadedFileName = uuidv4().concat('.jpg')
  s3Client.fPutObject('mgx-photos', uploadedFileName, file, 'image/jpg', function(err, etag) {
    if (err) {
      console.log('S3 ERROR:', err)
      return callback(err)
    } else {
      console.log(uploadedFileName, etag)
      return callback(null, `https://s3.amazon.com/mgx-photos/${uploadedFileName}`)
    }
  })
}

uploadFile(file, (err, url) => {
  if (err) return console.error('Upload Failed:', err)
  // Knex update here

})
