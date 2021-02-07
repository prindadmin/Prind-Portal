import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';
import LoadingSpinner from '../../../LoadingSpinner'
import PopOverHandler from '../../../popOverHandler'
import * as ComponentState from '../../ComponentStates'

import * as Strings from '../../../../../Data/Strings'

import getFileFromS3 from './getFileFromS3'
import uploadFileToS3 from './uploadFileToS3'

// TODO: Implement styling depending on state
// TODO: Implement error message displaying
// TODO: Style save button when disabled
// TODO: Style text editor when disabled
// TODO: Fix occasional errors with the S3 token
// TODO: Store changes so that a failure of upload doesn't lose information

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
      ver: PropTypes.string.isRequired,
      prevVer: PropTypes.string.isRequired,
      s3VersionId: PropTypes.string.isRequired,
      commitMessage: PropTypes.string,
      uploadedDateTime: PropTypes.string.isRequired,
    })),
    disabled: PropTypes.bool.isRequired,
    uploadFile: PropTypes.func.isRequired,
    getNewToken: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()

    // Check if the s3version exists
    var s3VersionId = ""
    var ver = ""
    if (props.fileVersions.length !== 0) {
      s3VersionId = props.fileVersions[0].s3VersionId
      ver = props.fileVersions[0].ver
    }

    this.state = {
      initialContent: '',
      content: '',
      s3VersionId,
      ver,
      state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER,
      errorMessage: '',
      showCommitDialogueBox: false,
      commitMessage: '',
    }
  }

  componentDidMount() {
    console.log(this.props.fileVersions)
    this.onSelectionChange({ target: { value: this.state.s3VersionId }})
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileVersions !== prevProps.fileVersions) {
      console.log(this.props.fileVersions)
    }
  }


  getVerFromS3Id = (s3VersionId) => {
    const { fileVersions } = this.props

    if (fileVersions.length > 0) {
      const versionObject = fileVersions.reduce((returnObject, fileVersion) => {
        returnObject[fileVersion.s3VersionId] = fileVersion.ver
        return returnObject
      }, {})
      return versionObject[s3VersionId]
    }

    return ""
  }


  onSelectionChange = (e) => {
    const s3VersionId = e.target.value
    const { projectId, pageName, fieldId, user } = this.props
    console.log(`S3 Version Requested: ${s3VersionId}`)

    // If there is no existing version of the git file, exit
    if (s3VersionId === "") {
      this.onNoExistingFile()
      return;
    }

    // Create the download values
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projectId}/${pageName}/${fieldId}`

    // Create the download parameters
    var downloadParams = {
      Bucket: bucketName,
      Key: key,
      VersionId: s3VersionId,
    }

    // Find the chosen version number and store in state along with s3VersionId
    const ver = this.getVerFromS3Id(s3VersionId)


    this.setState({
      ver,
      s3VersionId,
    })

    getFileFromS3(
      user,
      downloadParams,
      undefined,
      this.onProgressUpdate,
      this.onFileDownloadComplete,
      this.onFileDownloadFailed)
  }

  onProgressUpdate = (progress) => {
    console.log(progress)
  }

  onFileDownloadComplete = (result) => {
    console.log("File download successful")
    console.log(result)
    console.log(result.data.Body.toString())
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

  onNoExistingFile = () => {
    this.setState({
      state: ComponentState.QUIESCENT
    })
  }

  getVersionSelectSystem = (selectorName) => {
    const { fileVersions } = this.props

    var options = [
      <option key="0" value="">{Strings.GIT_TEXT_NO_VERSIONS_EXIST_YET}</option>
    ]
    var isDisabled = true

    if (fileVersions.length !== 0) {
      // Map the fileVersions to options
      options = fileVersions.slice(1).map((version, index) => {
        const date = new Date(version.uploadedDateTime)
        const displayDate = date.toISOString().split('T')[0]

        if (version.commitMessage === undefined) {
          return <option
            key={index}
            value={version.s3VersionId}>{`${displayDate} - ${Strings.GIT_TEXT_NO_COMMIT_MESSAGE_PROVIDED}`}</option>
        }

        return <option
          key={index}
          value={version.s3VersionId}>{`${displayDate} - ${version.commitMessage}`}</option>
      })
      isDisabled = false
    }

    return (
      <div className='version-select'>
        <select
          name={selectorName}
          id={selectorName}
          value={this.state.s3VersionId}
          disabled={isDisabled}
          onChange={(e) => this.onSelectionChange(e)}>
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

  showCommitDialogueBox = () => {
    this.setState({
      showCommitDialogueBox: true,
    })
  }

  cancelCommit = () => {
    this.setState({
      showCommitDialogueBox: false,
    })
  }

  onUploadRequest = () => {
    const { projectId, pageName, fieldId, user } = this.props

    this.setState({
      state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER,
      showCommitDialogueBox: false,
    })

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

    uploadFileToS3(
      user.projectS3Token,
      uploadParams,
      this.onUploadToS3ProgressUpdate,
      this.onUploadToS3Success,
      this.onUploadToS3Failed)
  }

  onUploadToS3ProgressUpdate = (progress) => {
    console.log(progress)
  }

  onUploadToS3Success = (result) => {
    console.log("File upload to S3 successful")
    const { projectId, pageName, fieldId } = this.props
    const { commitMessage, ver } = this.state

    console.log(`commitMessage: ${commitMessage}`)

    // Build parameters
    var uploadDetails = {
      filename: `GitText-${projectId}-${pageName}-${fieldId}`,
      commitMessage,
      prevVer: ver,
    }

    // Send to the reducer
    this.props.uploadFile(
      projectId,
      pageName,
      fieldId,
      uploadDetails,
      "gitText",
      this.onMetadataSaveSuccess,
      this.onMetadataSaveFailed)
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

  handleCommitMessageChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (value.length > 50) {
      return
    }

    this.setState({
      [name]: value
    });
  }


  // TODO: Continue here
  getCommitDialogueBox = () => {
    return (
      <PopOverHandler>
        <div id='popup-greyer' onClick={(e) => {
          this.cancelCommit()
          e.stopPropagation()
          }}>
          <div id='popover'>
            <div id='popup-box' className='fit-content'>
              <div id="git-commit" className='popover-container' onClick={(e) => e.stopPropagation()}>
                <h2 style={{marginBottom: '0.2em'}}>{ Strings.GIT_TEXT_COMMIT_TITLE }</h2>
                <p>{ Strings.GIT_TEXT_COMMIT_DESCRIPTION }</p>

                <input
                  id="commitMessage"
                  name="commitMessage"
                  type="text"
                  placeholder={ Strings.PLACEHOLDER_COMMIT_MESSAGE }
                  value={this.state.commitMessage}
                  onChange={this.handleCommitMessageChange}
                  className={ this.state.commitMessage === '' ? "default" : "filled" }/>

                {
                  this.state.commitMessage.length === 50 ?
                  <p className='error'>{ Strings.GIT_TEXT_COMMIT_MESSAGE_MAX_LENGTH_REACHED }</p> :
                  <p className='info'>{ `${this.state.commitMessage.length}/50` }</p>
                }

                <input
                  type="submit"
                  value={ Strings.BUTTON_SAVE_CHANGES }
                  className="save-button"
                  onClick={(e) => this.onUploadRequest()} />
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }

  getEditor = () => {
    const { disabled } = this.props
    return (
      <Editor
        initialValue={this.state.initialContent}
        value={this.state.content}
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
        {
          this.state.showCommitDialogueBox ?
          this.getCommitDialogueBox() :
          null
        }
        <input
          type="submit"
          disabled={this.state.disabled}
          value={ Strings.BUTTON_SAVE_CHANGES }
          className="save-button"
          onClick={(e) => this.showCommitDialogueBox()} />
      </React.Fragment>
    )
  }
}

export default TextWriter
