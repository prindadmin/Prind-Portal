import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import AWS from 'aws-sdk';
import { Editor } from '@tinymce/tinymce-react';

import * as Strings from '../../../../Data/Strings'

// TODO: Style text editor when disabled
// TODO: Compare old and new text in some way (https://mergely.com/)
// TODO: Update in server as versioned (normally text isn't versioned, right?)


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
    pageName: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      updateServerInProgress: false,
      updateServerError: false,
      uploadFileInProgress: false,
      uploadFileProgress: 0,
      uploadFileError: false,
      downloadFileInProgress: false,
      downloadFileProgress: 0,
      downloadFileError: false,
      errorText: "",
      content: '',
    }
  }

  componentDidMount() {

    this.downloadFromS3()
    /*
    this.setState({
      content: this.props.elementContent.fieldDetails.textValue
    })
    */
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  handleEditorChange = (e) => {
    console.log('Content was updated');
    this.setState({
      content: e.target.getContent()
    })
  }


  // When the user wants to save the changes, update the server
  saveChanges = (e) => {
    /*
    // This code was used when this was the equivalent of a LongText.  It is now the equivalent
    // of a file uploader
    const { pageName, projects, elementContent } = this.props

    const fieldDetails = {
      textValue: this.state.content
    }

    this.setState({
      updateServerError: false,
      updateServerInProgress: true,
    })

    this.props.updateField (
      projects.chosenProject.projectId,
      pageName,
      elementContent.id,
      fieldDetails,
      this.saveResolve,
      this.saveReject,
    )
    */

    this.uploadToS3()
  }

  getValidS3Token = () => {
    // TODO: Make this refresh the token if required
    const { user } = this.props
    if (user.projectS3Token === undefined) {
      this.setState({
        uploadFileError: true
      })
      return undefined;
    }
    return user.projectS3Token
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
    const { projects, pageName, fieldID, elementContent } = this.props

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
      Body: this.state.content,
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
          uploadFileError: true
        })
      })

    request.send();
  }

  onFileUploadComplete = (response) => {
    const { projects, pageName, elementContent } = this.props

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
    )
  }

  downloadFromS3 = () => {
    const { projects, pageName, fieldID, elementContent } = this.props

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
        console.log("ERROR downloading file to S3")
        console.error(error)
        that.setState({
          downloadFileError: true
        })
      })

    request.send();
  }

  onFileDownloadComplete = (response) => {
    this.setState({
      content: response.data.Body.toString()
    })

    // CONTINUE HERE
    // TODO: This currently doesn't refresh the TinyMCE content.  Need to do that

  }

  saveResolve = () => {
    this.setState({
      updateServerInProgress: false,
    })
  }

  saveReject = () => {
    this.setState({
      updateServerError: true,
      updateServerInProgress: false,
      errorText: Strings.ERROR_SAVING_CHANGES_TO_FIELD
    })
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    // TODO: Add state error variable handling

    const { title, description, fieldDetails, editable } = this.props.elementContent

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
            <Editor
              initialValue={fieldDetails.textValue}
              apikey={process.env.REACT_APP_TINY_API_KEY}
              disabled={!editable}
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
                  'undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help'
              }}
              onChange={this.handleEditorChange}
            />
          </div>

          <input
            type="submit"
            value={ Strings.BUTTON_SAVE_CHANGES }
            className="save-button"
            onClick={(e) => this.saveChanges(e)} />

        </div>
      </div>
    )
  }
}

export default GitText
