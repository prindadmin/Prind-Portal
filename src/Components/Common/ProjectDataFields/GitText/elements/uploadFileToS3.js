
import * as ComponentState from '../../ComponentStates'

function uploadFileToS3(s3, uploadParams, parent) {
  const { projectId, pageName, elementContent } = parent.props

  // Create a request
  var request = s3.putObject(uploadParams);

  request.on('httpUploadProgress', function (progress) {
      console.log(progress)
      parent.setState({
        uploadFileProgress: progress.loaded
      })
    })

    .on('success', function(response) {
      onFileUploadComplete(response, parent)
    })

    .on('error', function(error, response) {
      console.log("ERROR uploading file to S3")
      console.error(error)
      parent.setState({
        state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED,
      })
    })

  request.send();
}

function onFileUploadComplete(response, parent) {
  parent.setState({
    state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER_SUCCESS,
  })
}

export default uploadFileToS3
