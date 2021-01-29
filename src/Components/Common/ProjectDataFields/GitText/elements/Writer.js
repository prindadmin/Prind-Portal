import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';
import LoadingSpinner from '../../../LoadingSpinner'
import * as ComponentState from '../../ComponentStates'

import * as Strings from '../../../../../Data/Strings'

import getFileFromS3 from './getFileFromS3'
import uploadFileToS3 from './uploadFileToS3'

// TODO: Implement styling depending on state
// TODO: Implement error message displaying
// TODO: Style save button when disabled
// TODO: Style text editor when disabled
// TODO: Fix occasional errors with the S3 token

export class TextWriter extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    user: PropTypes.shape({
      projectS3Token: PropTypes.shape({
        accessKeyId: PropTypes.string.isRequired,
        secretAccessKey: PropTypes.string.isRequired,
        sessionToken: PropTypes.string.isRequired,
      })
    }).isRequired,
    fileVersions: PropTypes.arrayOf(PropTypes.shape({
      ver: PropTypes.string,
      prevVer: PropTypes.string,
      s3VersionId: PropTypes.string,
      commitMessage: PropTypes.string,
    })),
    disabled: PropTypes.bool.isRequired,
    uploadFile: PropTypes.func.isRequired,
    getNewToken: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      initialContent: '',
      content: '',
      s3VersionId: props.fileVersions[0].s3VersionId,
      state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER,
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.onSelectionChange({ target: { value: this.state.s3VersionId }})
  }

  onSelectionChange = (e) => {
    const s3VersionId = e.target.value
    const { projectId, pageName, fieldId, user } = this.props
    console.log(`S3 Version Requested: ${s3VersionId}`)

    // Create the download values
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projectId}/${pageName}/${fieldId}`

    // Create the download parameters
    var downloadParams = {
      Bucket: bucketName,
      Key: key,
      VersionId: s3VersionId,
    }

    this.setState({
      s3VersionId
    })

    getFileFromS3(user, downloadParams, undefined, this.onProgressUpdate, this.onFileDownloadComplete, this.onFileDownloadFailed)
  }

  onProgressUpdate = (progress) => {
    console.log(progress)
  }

  onFileDownloadComplete = (result) => {
    console.log("File download successful")
    console.log(result)
    this.setState({
      ...this.state,
      state: ComponentState.QUIESCENT,
      initialContent: result.data.Body.toString(),
      content: result.data.Body.toString(),
    })
  }

  onFileDownloadFailed = (error) => {
    console.error("File download failed")
    console.error(error.message)

    const { projectId, pageName, getNewToken } = this.props
    getNewToken(projectId, pageName)

    this.setState({
      state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED
    })
  }

  getVersionSelectSystem = (selectorName) => {
    const { fileVersions } = this.props

    // Map the fileVersions to options
    const options = fileVersions.slice(1).map((version, index) => {
      return <option key={index} value={version.s3VersionId}>{version.commitMessage}</option>
    })

    return (
      <div className='version-select'>
        <select
          name={selectorName}
          id={selectorName}
          value={this.state.s3VersionId}
          onChange={(e) => this.onSelectionChange(selectorName, e)}>
          {options}
        </select>
      </div>
    )
  }

  onHandleContentChange = (e) => {
    this.setState({
      content: e.target.getContent()
    })
  }

  onUploadRequest = () => {
    this.setState({
      state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER
    })


    const { projectId, pageName, fieldId } = this.props

    // Create the parameters
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projectId}/${pageName}/${fieldId}`

    // Create the parameters to upload the file with
    var uploadParams = {
      ACL: 'private',
      Body: this.state.content,
      Bucket: bucketName,
      ContentType: 'text/html',
      Key: key,
    };

    uploadFileToS3(uploadParams, this.onUploadToS3ProgressUpdate, this.onUploadToS3Success, this.onUploadToS3Failed)
  }

  onUploadToS3ProgressUpdate = (progress) => {
    console.log(progress)
  }

  onUploadToS3Success = (result) => {
    console.log("File upload to S3 successful")
    const { projectId, pageName, fieldId } = this.props
    // Build parameters
    var uploadDetails = {
      userFileName: `GitText-${projectId}-${pageName}-${fieldId}`
    }
    // Send to the reducer
    this.props.uploadFile(projectId, pageName, fieldId, uploadDetails, "gitText", this.onMetadataSaveSuccess, this.onMetadataSaveFailed)
  }

  onUploadToS3Failed = (error) => {
    console.log("ERROR uploading file to S3")
    console.error(error)
    this.setState({
      state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED,
      errorMessage: Strings.ERROR_SAVING_CHANGES_TO_FIELD,
    })
  }

  onMetadataSaveSuccess = () => {
    this.setState({
      state: ComponentState.QUIESCENT,
    })
  }

  onMetadataSaveFailed = () => {
    this.setState({
      state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED,
      errorMessage: Strings.ERROR_SAVING_CHANGES_TO_FIELD,
    })
  }


  getEditor = () => {
    const { disabled } = this.props
    return (
      <Editor
        initialValue={this.state.initialContent}
        apikey={process.env.REACT_APP_TINY_API_KEY}
        disabled={disabled}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
        }}
        onChange={this.onHandleContentChange}
      />
    )
  }

  getErrorDownloading = () => {
    return(
      <div className='error-text'>
        { Strings.ERROR_DOWNLOADING_TEXT_FOR_GIT_BOX }
        <input
          type="submit"
          value={ Strings.BUTTON_RETRY }
          className="save-button"
          onClick={(e) => this.onSelectionChange({ target: { value: this.state.s3VersionId }})} />
      </div>
    )
  }


  render() {
    console.log(this.state.state)
    return (
      <React.Fragment>
        {
          this.state.state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER ?
          <LoadingSpinner /> :
          null
        }
        {
          this.state.state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER ?
          <LoadingSpinner /> :
          null
        }
        {
          this.state.state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED ?
          this.getErrorDownloading() :
          null
        }
        {
          this.state.state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED ?
          this.getErrorDownloading() :
          null
        }
        {
          this.state.state === ComponentState.QUIESCENT ?
          <React.Fragment>
            { this.getVersionSelectSystem("oldContent") }
            { this.getEditor() }
          </React.Fragment> :
          null
        }
        <input
          type="submit"
          disabled={this.state.disabled}
          value={ Strings.BUTTON_SAVE_CHANGES }
          className="save-button"
          onClick={(e) => this.onUploadRequest()} />
      </React.Fragment>
    )
  }
}

export default TextWriter
