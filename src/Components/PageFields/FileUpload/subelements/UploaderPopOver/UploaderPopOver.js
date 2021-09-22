import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PopOverHandler from '../../../../Common/popOverHandler'

import {
  ProgressBar,
  Intent,
  Button,
} from '@blueprintjs/core'

import AWS from 'aws-sdk';
import * as Strings from '../../../../../Data/Strings'
import * as ComponentStates from '../../../../ComponentStates'

const windowCloseDelay = 1500

// TODO: FUTURE: Do something with the QUIESCENT state

export class UploaderPopOver extends Component {
  static propTypes = {
    fileDetails: PropTypes.shape({
      files: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          size: PropTypes.number.isRequired,
          value: PropTypes.string.isRequired
        }).isRequired
      ).isRequired
    }).isRequired,
    projectID: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.number.isRequired,
    fieldType: PropTypes.string.isRequired,
    onCancelPopup: PropTypes.func.isRequired,
    user: PropTypes.shape({
      projectS3Token: PropTypes.shape({
        AccessKeyId: PropTypes.string.isRequired,
        SecretAccessKey: PropTypes.string.isRequired,
        SessionToken: PropTypes.string.isRequired
      })
    }).isRequired,
    uploadFile: PropTypes.func.isRequired,
    requestS3ProjectFileUploadToken: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      uploadProgress: 0,
      state: ComponentStates.UPLOAD_IN_PROGESS
    }
  }

  componentDidMount() {
    // Upload the file to S3
    this.uploadToS3()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.projectS3Token !== prevProps.user.projectS3Token) {
      this.uploadToS3()
    }
  }

  getValidS3Token = () => {
    const { user, projectID, pageName } = this.props
    if (user.projectS3Token === undefined) {
      this.setState({
        state: ComponentStates.ERROR_WHEN_LOADING
      })
      this.props.requestS3ProjectFileUploadToken(projectID, pageName)
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
    const { fileDetails, projectID, pageName, fieldID } = this.props
    const file = fileDetails.files[0]

    const token = this.getValidS3Token()
    if (!token) {
      this.setState({
        state: ComponentStates.ERROR_WHEN_LOADING
      })
      return;
    }

    // Update the s3 credentials to allow upload of file to S3
    this.configureAWSAuthorisation(token)

    // Create an S3 service provider
    const s3 = new AWS.S3()

    // Fetch the parameters
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projectID}/${pageName}/${fieldID}`

    // Create the parameters to upload the file with
    var uploadParams = {
      ACL: 'private',
      Body: file,
      Bucket: bucketName,
      ContentType: file.type,
      Key: key,
    };

    // Create a virtual version of the react object so it can be used in the request
    const that = this;

    // Create a request
    var request = s3.putObject(uploadParams);

    request.on('httpUploadProgress', function (progress) {
        that.setState({
          uploadProgress: progress.loaded
        })
      })

      .on('success', function(response) {
        // Timer to keep the window open for a few seconds after upload completes
        setTimeout(() => {
          that.setState({
            state: ComponentStates.QUIESCENT
          })
          that.informServer(response)
        }, windowCloseDelay);

      })

      .on('error', function(error, response) {
        //console.log("Error!");
        //console.error(error)
        that.setState({
          state: ComponentStates.ERROR_WHEN_LOADING
        })
      })

    request.send();
  }

  // Tell the Prin-D server that there has been an upload with the following details
  informServer = (response) => {
    const { uploadFile, fileDetails, projectID, pageName, fieldID, fieldType } = this.props

    // Build parameters
    var uploadDetails = {
      filename: fileDetails.files[0].name
    }

    // Send to the reducer
    uploadFile(
      projectID,
      pageName,
      fieldID,
      uploadDetails,
      fieldType,
    )

    // Close the popup
    this.cancelPopup();
  }


  // perform this when the pop up needs to close
  cancelPopup = () => {
    this.props.onCancelPopup()
  }


  getErrorBlock = () => {
    return(
      <div>
        <div>
          <b>ERROR: There was an error uploading the file, please try again</b>
        </div>
        <div>
          <Button
            id="close-button"
            text={Strings.CLOSE_WINDOW}
            onClick={(e) => this.cancelPopup()}
            intent={Intent.DANGER}
            />
        </div>
      </div>
    )
  }


  render() {
    //console.log(this.props.fileDetails)
    //console.log(this.props.fileDetails.files)

    const { fileDetails } = this.props
    const { uploadProgress } = this.state

    const file = fileDetails.files[0]
    var fileSize = file.size

    const progressValue = uploadProgress / fileSize
    const uploadStatus = this.state.state === ComponentStates.ERROR_WHEN_LOADING ? "error" : ""


    return(
      <PopOverHandler>
        <div id='popup-greyer'>
          <div id='uploader-popover'>
            <div id='popup-box' className={uploadStatus}>
              <div className='uploader-popover-container'>
                <div className='element-title'>
                  {Strings.UPLOAD_IN_PROGESS}
                </div>
                <div className='element-description'>
                  <p><b>{Strings.FILE_NAME}</b> {file.name}</p>
                  <p><b>{Strings.UPLOADED_SIZE}</b> {uploadProgress + " / " + fileSize + " bytes"}</p>
                </div>
                <ProgressBar
                  intent={this.state.state === ComponentStates.ERROR_WHEN_LOADING ? Intent.DANGER : Intent.PRIMARY}
                  value={progressValue}
                  />
                {
                  this.state.state === ComponentStates.ERROR_WHEN_LOADING ? this.getErrorBlock() : null
                }
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }

}

export default UploaderPopOver
