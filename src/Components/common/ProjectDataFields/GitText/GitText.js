import React, { Component } from 'react'
import PropTypes from 'prop-types'


import AWS from 'aws-sdk';
import ItemIcon from '../../ItemIcon'

import * as Strings from '../../../../Data/Strings'
import * as ComponentState from '../ComponentStates'
import * as Constants from '../Constants'

import Writer from './elements/Writer'
import Comparer from './elements/Comparer'
import LoadingSpinner from '../../LoadingSpinner'

import getFileFromS3 from './elements/getFileFromS3'
import uploadFileToS3 from './elements/uploadFileToS3'
// TODO: Style text editor when disabled
// TODO: Update in server as versioned (Not sure how this works on the file upload yet)
// TODO: Add file version selector and downloader to allow comparison
// TODO: Get toasts working
// TODO: Fix errors when first loading the page
// TODO: Fix occasional errors with the S3 token
// TODO: Style save button when disabled

export class GitText extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      fieldDetails: PropTypes.shape({
        textValue: PropTypes.string,
      }).isRequired,
      fileDetails: PropTypes.arrayOf(PropTypes.shape({
        uploadedDateTime: PropTypes.string,
        uploadedBy: PropTypes.string,
        ver: PropTypes.string,
        prevVer: PropTypes.string,
        s3VersionId: PropTypes.string,
        uploadName: PropTypes.string,
        commitMessage: PropTypes.string,
      })).isRequired,
    }),
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      state: ComponentState.QUIESCENT,
      view: ComponentState.GIT_TEXT_WRITER_OPEN,
      uploadFileProgress: 0,
      downloadFileProgress: 0,
      errorMessage: "",
      originalCurrentContent: '',
      currentContent: '',
      oldContent: '',
      editable: false,
      toastText: '',
      showToast: false,
      requestedOldFileVersionID: '',
      requestedCurrentFileVersionID: '',
      lastRequestIsOld: false,
    }
  }

  componentDidMount() {
    console.log(this.props)
    if (this.props.elementContent.fileDetails !== undefined) {
      if (this.props.elementContent.fileDetails.length !== 0) {
        this.setState({
          requestedCurrentFileVersionID: this.props.elementContent.fileDetails[0].s3VersionId,
        })
      }
    }
    this.downloadFromS3(this.state.lastRequestIsOld)
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.state !== prevState.state) {
      if (this.state.state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER_SUCCESS) {
        this.uploadMetadataToDatabase()
      }
      if (this.state.state === ComponentState.UPDATING_METADATA_ON_SERVER_SUCCESS) {
        this.showToast(Strings.GIT_UPLOAD_FILE_SUCCESSFUL_TOAST)
      }
      if (this.state.state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED) {
        this.showToast(Strings.GIT_UPLOAD_FILE_FAILED_TOAST)
      }
      if (this.state.state === ComponentState.S3_TOKEN_NOW_AVAILABLE) {
        console.log("new S3 token available")
      }
      if (this.state.requestedCurrentFileVersionID !== prevProps.requestedCurrentFileVersionID) {
        console.log("file version requested changed")
        this.downloadFromS3(false)
      }
      if (this.state.requestedOldFileVersionID !== prevProps.requestedOldFileVersionID) {
        console.log("file version requested changed")
        this.downloadFromS3(true)
      }
    }
  }


  handleEditorChange = (e) => {
    console.log('Content was updated');
    this.setState({
      currentContent: e.target.getContent()
    })
  }


  getValidS3Token = () => {
    // TODO: Make this refresh the token if required; stops fetching if not present
    const { user, requestS3ProjectFileUploadToken, projectId, pageName } = this.props
    if (user.projectS3Token === undefined) {
      this.setState({
        state: ComponentState.NO_S3_TOKEN_AVAILABLE
      })
      requestS3ProjectFileUploadToken(projectId, pageName, this.fetchTokenSuccess, this.fetchTokenFailed)
      return undefined;
    }
    return user.projectS3Token
  }

  fetchTokenSuccess = () => {
    console.log("S3 token fetched successfully")
    this.setState({
      state: ComponentState.S3_TOKEN_NOW_AVAILABLE,
    })
  }

  fetchTokenFailed = (error) => {
    console.log(error)
    this.setState({
      state: ComponentState.NO_S3_TOKEN_AVAILABLE,
    })
  }

  configureAWSAuthorisation = (token) => {
    // Update credentials to allow access to S3
    const { AccessKeyId, SecretAccessKey, SessionToken } = token
    AWS.config.update({
      credentials: {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretAccessKey,
        sessionToken: SessionToken
      }
    });
    return;
  }

  uploadToS3 = () => {
    const { projectId, pageName, elementContent } = this.props
    const token = this.getValidS3Token()

    if (token === undefined) {
      return;
    }

    this.configureAWSAuthorisation(token)

    // Create an S3 service provider
    const s3 = new AWS.S3()

    // Create the parameters
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projectId}/${pageName}/${elementContent.id}`

    // Create the parameters to upload the file with
    var uploadParams = {
      ACL: 'private',
      Body: this.state.currentContent,
      Bucket: bucketName,
      ContentType: 'text/html',
      Key: key,
    };

    uploadFileToS3(s3, uploadParams, this)
  }


  uploadMetadataToDatabase = () => {
    const { pageName, projectId, elementContent } = this.props
    // Build parameters
    var uploadDetails = {
      userFileName: `GitText-${projectId}-${pageName}-${elementContent.id}`
    }
    // Send to the reducer
    this.props.uploadFile(projectId, pageName, elementContent.id, uploadDetails, "gitText", this.saveResolve, this.saveReject)
    this.setState({
      state: ComponentState.UPDATING_METADATA_ON_SERVER
    })
  }

  saveResolve = () => {
    this.setState({
      state: ComponentState.UPDATING_METADATA_ON_SERVER_SUCCESS,
    })
  }

  saveReject = () => {
    this.setState({
      state: ComponentState.UPDATING_METADATA_ON_SERVER_FAILED,
      errorMessage: Strings.ERROR_SAVING_CHANGES_TO_FIELD,
    })
  }

  showToast = (textToShow) => {
    this.setState({
      state: ComponentState.QUIESCENT,
      toastText: textToShow,
      showToast: true,
    })

    const that = this;

    setTimeout(function() {
      that.setState({
        showToast: false,
      })
    }, 2000);
  }


  downloadFromS3 = (isOld) => {
    const { projectId, pageName, elementContent } = this.props
    const token = this.getValidS3Token()
    if (token === undefined) {
      return;
    }
    this.configureAWSAuthorisation(token)

    // Create an S3 service provider
    const s3 = new AWS.S3()

    // Create the download values
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projectId}/${pageName}/${elementContent.id}`

    // Create the download parameters
    var downloadParams = {
      Bucket: bucketName,
      Key: key
    };

    if (isOld) {
      if (this.state.requestedOldFileVersionID !== "") {
        downloadParams.VersionId = this.state.requestedOldFileVersionID
      }
    }
    else {
      if (this.state.requestedCurrentFileVersionID !== "") {
        downloadParams.VersionId = this.state.requestedCurrentFileVersionID
      }
    }
    getFileFromS3(s3, downloadParams, this)
  }


  updateRequestedFileVersion = (newFileVersion, selectorName) => {
    if (selectorName === Constants.OLDSELECTOR) {
      this.setState({
        lastRequestIsOld: true,
        requestedOldFileVersionID: newFileVersion
      })
      return
    }

    this.setState({
      lastRequestIsOld: false,
      requestedCurrentFileVersionID: newFileVersion
    })
  }


  getEditor = () => {
    const fileVersions = [
      {
        ver: "1",
        prevVer: "0",
        s3VersionId: "u3.WYA9VlvVba2EY9NywkQHBExdKq9eA",
        commitMessage: "Oldest Commit"
      },
      {
        ver: "2",
        prevVer: "1",
        s3VersionId: "GndxW2exut63gfISgKr._bgLoxEBa1kh",
        commitMessage: "Intermediate Commit"
      },
      {
        ver: "3",
        prevVer: "2",
        s3VersionId: "IhHU28Y.7doCQmf9SijFU3M6C8VDCY5x",
        commitMessage: "Latest Commit"
      }
    ]


    if (this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN) {
      return (
        <Writer
          currentContent={this.state.currentContent}
          fileVersions={fileVersions}
          onRequestNewFileVersionData={this.updateRequestedFileVersion}
          onHandleContentChange={this.handleEditorChange}
          disabled={!this.props.elementContent.editable}
          currentVersionSelected={this.state.requestedCurrentFileVersionID} />
      )
    }

    // newContent={`${this.state.currentContent.replace("test","abc")}`} />

    return (
      <Comparer
        oldContent={this.state.oldContent}
        newContent={this.state.currentContent}
        fileVersions={fileVersions}
        onRequestNewFileVersionData={this.updateRequestedFileVersion}
        currentOldVersionSelected={this.state.requestedOldFileVersionID}
        currentNewVersionSelected={this.state.requestedCurrentFileVersionID} />
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
          onClick={(e) => this.downloadFromS3(true)} />
      </div>
    )
  }

  // TODO: style button
  getChangeViewButtons = () => {
    const isWriter = this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN
    const changeTo = this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN ? ComponentState.GIT_TEXT_COMPARER_OPEN : ComponentState.GIT_TEXT_WRITER_OPEN
    const title = this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN ? Strings.GIT_TEXT_OPEN_COMPARER : Strings.GIT_TEXT_OPEN_WRITER

    return(
      <div className='switch-state-buttons'>
        <button
          title={title}
          className="view-change-button btn-primary"
          onClick={(e) => this.setState({view: changeTo})} >
          <ItemIcon size='3x' type={isWriter ? 'columns' : 'edit'} />
        </button>
      </div>
    )
  }


  render() {
    const { title, description } = this.props.elementContent
    const { state, view, showToast } = this.state
    console.log(state)
    return (
      <div id='git-text-element'>
        <div className='git-text-element-container'>
          <div className='element-title'>
            {title}
          </div>

          <div className='element-description'>
            {description}
          </div>

          <div className='container'>
            {
              state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER ? <LoadingSpinner />  : null
            }
            {
              state === ComponentState.UPDATING_METADATA_ON_SERVER ? <LoadingSpinner />  : null
            }
            {
              state === ComponentState.CHECKING_EXISTING_FILE_EXISTS_ON_SERVER ? <LoadingSpinner />  : null
            }
            {
              state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER ? <LoadingSpinner /> : null
            }
            {
              state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_SUCCESS ? this.getEditor() : null
            }
            {
              state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED ? this.getEditor() : null
            }
            {
              state === ComponentState.QUIESCENT ? this.getEditor() : null
            }
            {
              state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED ? this.getErrorDownloading() : null
            }
            {
              state === ComponentState.NO_S3_TOKEN_AVAILABLE ? this.getErrorDownloading() : null
            }
          </div>
          <input
            type="submit"
            disabled={!(state === ComponentState.QUIESCENT && view !== ComponentState.GIT_TEXT_COMPARER_OPEN)}
            value={ Strings.BUTTON_SAVE_CHANGES }
            className="save-button"
            onClick={(e) => this.uploadToS3()} />
          {
            showToast ?
            <div className='git-toast'>
              { Strings.GIT_UPLOAD_FILE_SUCCESSFUL_TOAST }
            </div> :
            null
          }
          {
            state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_SUCCESS ||
            state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED ||
            state === ComponentState.QUIESCENT ?
            this.getChangeViewButtons() :
            null
          }

        </div>
      </div>
    )
  }
}

export default GitText
