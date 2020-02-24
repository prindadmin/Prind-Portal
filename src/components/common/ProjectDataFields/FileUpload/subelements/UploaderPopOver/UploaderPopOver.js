import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PopOverHandler from '../../../../popOverHandler'

import {
  ProgressBar,
  Intent,
  Button,
} from '@blueprintjs/core'

import AWS from 'aws-sdk';

import * as strings from '../../../../../../data/Strings'


const windowCloseDelay = 1500

export class Element extends Component {
  static propTypes = {
    fileDetails: PropTypes.object.isRequired,
    projectID: PropTypes.any.isRequired,
    pageName: PropTypes.any.isRequired,
    fieldID: PropTypes.any.isRequired,
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
    // Upload the file to S3
    this.uploadToS3()

  }


  uploadToS3 = () => {

    const { fileDetails, user, projectID, pageName, fieldID } = this.props
    const file = fileDetails.files[0]

    if (user.projectS3Token === undefined) {
      this.setState({
        uploadError: true
      })
      return;
    }

    const { AccessKeyId, SecretAccessKey, SessionToken } = user.projectS3Token

    // Update credentials to allow access to S3
    AWS.config.update({
      credentials: {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretAccessKey,
        sessionToken: SessionToken
      }
    });

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
        // TODO: Get the version ID of the uploaded document to send to server

        setTimeout(() => {
          that.informServer(response)
        }, windowCloseDelay);

      })

      .on('error', function(error, response) {
        console.log("Error!");
        console.log(error)

        that.setState({
          uploadError: true
        })
      })

    request.send();
  }

  // Tell the Prin-D server that there has been an upload with the following details
  informServer = (response) => {
    const { auth, fileDetails, projectID, pageName, fieldID } = this.props
    const { params } = response.request

    // Build parameters
    var uploadDetails = {
      userFileName: fileDetails.files[0].name,
      bucket: params.Bucket,
      key: params.Key,
      projectID,
      pageName,
      fieldID,
    }

    // Send to the reducer
    this.props.uploadFile(
      auth.info.idToken.jwtToken,
      pageName,
      uploadDetails
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
            text={strings.CLOSE_WINDOW}
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
                  {strings.UPLOAD_IN_PROGESS}
                </div>
                <div className='element-description'>
                  <p><b>{strings.FILE_NAME}</b> {fileDetails.value.replace("C:\\fakepath\\", "")}</p>
                  <p><b>{strings.UPLOADED_SIZE}</b> {uploadProgress + " / " + fileSize + " bytes"}</p>
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

export default Element
