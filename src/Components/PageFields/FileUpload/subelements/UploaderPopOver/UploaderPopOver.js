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

const windowCloseDelay = 1500

// TODO: After success, this should change the page that called it to the loading spinner, not just sit there

export class UploaderPopOver extends Component {
  static propTypes = {
    fileDetails: PropTypes.object.isRequired,
    projectID: PropTypes.any.isRequired,
    pageName: PropTypes.any.isRequired,
    fieldID: PropTypes.any.isRequired,
    fieldType: PropTypes.string.isRequired,
    onCancelPopup: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      uploadProgress: 0,
      uploadError: false,
    }
  }

  componentDidMount() {
    const { projectID, pageName } = this.props

    // Upload the file to S3
    this.uploadToS3()
    this.props.requestS3ProjectFileUploadToken(projectID, pageName)
  }

  getValidS3Token = () => {
    // TODO: Make this refresh the token if required; stops fetching if not present
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
    const { fileDetails, projectID, pageName, fieldID } = this.props
    const file = fileDetails.files[0]

    const token = this.getValidS3Token()
    if (token === undefined) {
      console.log("there was an issue getting an S3 token")
      this.setState({
        uploadError: true
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
          that.informServer(response)
        }, windowCloseDelay);

      })

      .on('error', function(error, response) {
        console.log("Error!");
        console.error(error)

        that.setState({
          uploadError: true
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
            text={Strings.CLOSE_WINDOW}
            onClick={(e) => this.cancelPopup()}
            intent={Intent.DANGER}
            />
        </div>
      </div>
    )
  }


  render() {

    const { fileDetails } = this.props
    const { uploadProgress, uploadError } = this.state

    var fileSize = fileDetails.files[0].size

    const progressValue = uploadProgress / fileSize
    const uploadStatus = uploadError ? "error" : ""


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
                  <p><b>{Strings.FILE_NAME}</b> {fileDetails.value.replace("C:\\fakepath\\", "")}</p>
                  <p><b>{Strings.UPLOADED_SIZE}</b> {uploadProgress + " / " + fileSize + " bytes"}</p>
                </div>
                <ProgressBar
                  intent={uploadError? Intent.DANGER : Intent.PRIMARY}
                  value={progressValue}
                  />
                {
                  uploadError ? this.getErrorBlock() : null
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
