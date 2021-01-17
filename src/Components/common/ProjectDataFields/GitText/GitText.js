import React, { Component } from 'react'
//import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {
  Spinner,
  Intent,
} from '@blueprintjs/core'

import AWS from 'aws-sdk';
import { Editor } from '@tinymce/tinymce-react';

import * as Strings from '../../../../Data/Strings'
import * as ComponentState from '../ComponentStates'

// TODO: Style text editor when disabled
// TODO: Compare old and new text in some way (https://mergely.com/ or https://github.com/kpdecker/jsdiff)
// TODO: Update in server as versioned (Not sure how this works on the file upload yet)

// CONTINUE HERE: Lots to do on the state flow (i.e. what fetch/upload to run when based on S3 token status)

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
    }),
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      state: ComponentState.QUIESCENT,
      uploadFileProgress: 0,
      downloadFileProgress: 0,
      errorMessage: "",
      originalContent: '',
      currentContent: '',
      editable: false,
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.downloadFromS3()
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.state !== prevState.state) {
      if (this.state.state === ComponentState.S3_TOKEN_NOW_AVAILABLE) {
        // TODO: this
      }
    }
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  handleEditorChange = (e) => {
    console.log('Content was updated');
    this.setState({
      currentContent: e.target.getContent()
    })
  }


  // When the user wants to save the changes, update the server
  saveChanges = (e) => {
    this.uploadToS3()
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
    const { projects, pageName, elementContent } = this.props

    const token = this.getValidS3Token()
    if (token === undefined) {
      return;
    }
    this.configureAWSAuthorisation(token)

    // Create an S3 service provider
    const s3 = new AWS.S3()

    // Create the parameters
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projects.chosenProject.projectId}/${pageName}/${elementContent.id}`

    // Create the parameters to upload the file with
    var uploadParams = {
      ACL: 'private',
      Body: this.state.currentContent,
      Bucket: bucketName,
      ContentType: 'text/html',
      Key: key,
    };

    // Create a virtual version of the react object so it can be used in the request
    const that = this;

    // Create a request
    var request = s3.putObject(uploadParams);

    request.on('httpUploadProgress', function (progress) {
        console.log(progress)
        that.setState({
          uploadFileProgress: progress.loaded
        })
      })

      .on('success', function(response) {
        that.onFileUploadComplete(response)
      })

      .on('error', function(error, response) {
        console.log("ERROR uploading file to S3")
        console.error(error)
        that.setState({
          state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER_FAILED,
        })
      })

    request.send();
  }

  onFileUploadComplete = (response) => {
    const { projects, pageName, elementContent } = this.props

    this.setState({
      state: ComponentState.UPLOADING_NEW_FILE_TO_SERVER_SUCCESS,
    })

    // Build parameters
    var uploadDetails = {
      userFileName: `GitText-${projects.chosenProject.projectId}-${pageName}-${elementContent.id}`
    }

    // Send to the reducer
    this.props.uploadFile (
      projects.chosenProject.projectId,
      pageName,
      elementContent.id,
      uploadDetails,
      this.saveResolve,
      this.saveReject,
    )

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


  downloadFromS3 = () => {
    const { projects, pageName, elementContent } = this.props

    const token = this.getValidS3Token()
    if (token === undefined) {
      return;
    }
    this.configureAWSAuthorisation(token)

    // Create an S3 service provider
    const s3 = new AWS.S3()

    // Create the download values
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projects.chosenProject.projectId}/${pageName}/${elementContent.id}`

    // Create the download parameters
    var downloadParams = {
      Bucket: bucketName,
      Key: key
    };

    // Create a request
    var request = s3.getObject(downloadParams);

    const that = this;

    // TODO: Make check for file existence before trying to download
    request.on('httpDownloadProgress', function (progress) {
        console.log(progress)
        that.setState({
          downloadFileProgress: progress.loaded
        })
      })
      .on('success', function(response) {
        that.onFileDownloadComplete(response)
      })
      .on('error', function(error, response) {
        console.log("ERROR downloading file from S3")
        console.error(error)
        that.setState({
          state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED,
        })
      })

    request.send();
  }

  onFileDownloadComplete = (response) => {
    console.log("File download complete")
    this.setState({
      originalContent: response.data.Body.toString(),
      currentContent: response.data.Body.toString(),
      state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_SUCCESS
    })
  }

  getLoadingSpinner = () => {
    return (
      <div className='projects-loading-container fill'>
        <div className='loading-spinner'>
          <Spinner size={100} intent={Intent.DANGER} />
          <p>{Strings.GIT_TEXT_LOADING}</p>
        </div>
      </div>
    )
  }

  getEditor = () => {
    const { elementContent } = this.props
    const { originalContent, state } = this.state
    const editable = state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_SUCCESS

    return (
      <Editor
        initialValue={originalContent}
        apikey={process.env.REACT_APP_TINY_API_KEY}
        disabled={!editable || !elementContent.editable}
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
        onChange={this.handleEditorChange}
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
          onClick={(e) => this.downloadFromS3()} />
      </div>
    )
  }


  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    // TODO: Add state error variable handling
    const { title, description } = this.props.elementContent
    const { originalContent, state } = this.state

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
              state === ComponentState.UPLOADING_NEW_FILE_TO_SERVER ||
              state === ComponentState.UPDATING_METADATA_ON_SERVER ||
              state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER ?
              this.getLoadingSpinner() :
              null
            }
            {
              state === ComponentState.QUIESCENT ?
              this.getEditor() :
              null
            }
            {
              state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED ?
              this.getErrorDownloading() :
              null
            }

          </div>
          {
            state === ComponentState.QUIESCENT ?
            <input
              type="submit"
              value={ Strings.BUTTON_SAVE_CHANGES }
              className="save-button"
              onClick={(e) => this.saveChanges(e)} /> :
            null
          }

        </div>
      </div>
    )
  }
}

export default GitText
