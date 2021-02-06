import AWS from 'aws-sdk';

async function checkFileExists(s3, downloadParams) {
  const result = s3.headObject(downloadParams, function (err, metadata) {
    console.log(err, metadata)
    if (err) {
      // File does not exist, so no need to fetch
      return false
    } else {
      return true
    }
  });
  return result
}


function downloadFileContent(s3, downloadParams, selectorName, progressFunc, resolve, reject) {
  console.log(downloadParams)

  // Create a request
  var request = s3.getObject(downloadParams);

  // Send request
  request.on('httpDownloadProgress', function (progress) {
      if (progressFunc !== undefined) {
        progressFunc(progress, selectorName)
      }
    })
    .on('success', function(response) {
      if(resolve !== undefined) {
        resolve(response, selectorName)
      }
    })
    .on('error', function(error, response) {
      if(resolve !== undefined) {
        reject(error, selectorName)
      }
    })
  request.send();
}


function getFileDataFromS3(userProps, downloadParams, selectorName, progressFunc, resolve, reject) {
  // Create an S3 service provider
  const s3 = new AWS.S3()

  console.log(userProps.projectS3Token)

  if(userProps.projectS3Token === undefined) {
    reject({ message: "No S3 token in redux store" })
    return;
  }

  checkFileExists(s3, downloadParams)
    .then(exists => {
      console.log(exists)
      //console.log(`File exists: ${exists}`)
      if (exists) {
        downloadFileContent(s3, downloadParams, selectorName, progressFunc, resolve, reject)
      }
      else {
        reject({ message: "File does not exist" })
      }
    })
}

export default getFileDataFromS3
