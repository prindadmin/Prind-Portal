
import * as ComponentState from '../../ComponentStates'

async function checkFileExists(s3, downloadParams, parent) {
  const result = s3.headObject(downloadParams, function (err, metadata) {
    console.log(err, metadata)
    if (err) {
      // File does not exist, so no need to fetch
      console.log("File does not exist")
      console.log(err)
      return false
    } else {
      console.log("File exists")
      return true
    }
  });
  return result
}


function downloadFileContent(s3, downloadParams, parent, lastRequestIsOld) {
  console.log(downloadParams)

  // Create a request
  var request = s3.getObject(downloadParams);

  // Send request
  request.on('httpDownloadProgress', function (progress) {
      console.log(progress)
      parent.setState({
        downloadFileProgress: progress.loaded
      })
    })
    .on('success', function(response) {
      onFileDownloadComplete(response, parent, downloadParams, lastRequestIsOld)
    })
    .on('error', function(error, response) {
      console.log("ERROR downloading file from S3")
      console.error(error)
      console.log(response)
      parent.setState({
        state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED,
      })
    })
  request.send();
}


function onFileDownloadComplete(response, parent, downloadParams, lastRequestIsOld) {
  console.log("File download complete")
  console.log(lastRequestIsOld)


  if (lastRequestIsOld) {
    parent.setState({
      oldVersion: {
        ...parent.state.oldVersion,
        content: response.data.Body.toString(),
        versionId: downloadParams.VersionId === undefined ? '' : downloadParams.VersionId
      },
      state: ComponentState.QUIESCENT
    })
    return
  }

  parent.setState({
    currentVersion: {
      ...parent.state.currentVersion,
      originalContent: response.data.Body.toString(),
      content: response.data.Body.toString(),
      versionId: downloadParams.VersionId === undefined ? '' : downloadParams.VersionId
    },
    state: ComponentState.QUIESCENT
  })
}


async function getFileDataFromS3(s3, downloadParams, parent, lastRequestIsOld) {
  parent.setState({
    state: ComponentState.CHECKING_EXISTING_FILE_EXISTS_ON_SERVER
  })

  await checkFileExists(s3, downloadParams, parent)
    .then(exists => {
      console.log(exists)
      if (exists) {
        downloadFileContent(s3, downloadParams, parent, lastRequestIsOld)
      }
      else {
        parent.setState({
          state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED,
        })
      }
    })
}
export default getFileDataFromS3
