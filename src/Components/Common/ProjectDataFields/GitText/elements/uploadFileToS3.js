import AWS from 'aws-sdk';

function uploadFileToS3(token, uploadParams, progressFunc, resolve, reject) {
  // Create an S3 service provider
  const s3 = new AWS.S3()

  //configureAWSAuthorisation(token)

  // Create a request
  var request = s3.putObject(uploadParams);

  request.on('httpUploadProgress', function (progress) {
      if(progressFunc !== undefined) {
        progressFunc(progress)
      }
    })
    .on('success', function(response) {
      resolve(response)
    })
    .on('error', function(error, response) {
      reject(error)
    })
  request.send();
}

export default uploadFileToS3
