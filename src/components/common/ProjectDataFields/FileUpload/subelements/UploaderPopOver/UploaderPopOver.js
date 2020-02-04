import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PopOverHandler from '../../../../popOverHandler'

import {
  ProgressBar,
  Intent,
} from '@blueprintjs/core'

import AWS from 'aws-sdk';

import * as strings from '../../../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    details: PropTypes.object.isRequired,
    onCancelPopup: PropTypes.func.isRequired,
    onUploadSuccess: PropTypes.func.isRequired,
    onUploadFailure: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      uploadProgress: 10,
    }
  }


  componentDidMount() {

    const { details } = this.props

    console.log(details)

    // TODO: Replace this with an upload and fire cancel when complete
    setTimeout(() => {
      this.cancelPopup();
    }, 25000);


    // TODO: Upload the file to S3
    const fileName = this.uploadToS3()

    // TODO: Upload details to the database
    this.props.uploadFile(
      this.props.auth.info.idToken.jwtToken,
      this.props.pageName,
      fileName,
    )
  }

  uploadToS3 = () => {

    const { details, auth } = this.props

    var fileName = details.value.replace("C:\\fakepath\\", "")

    // Create the S3
    AWS.config.update({
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: this.props.auth.stsToken.AccessKeyId,
      secretAccessKey: this.props.auth.stsToken.SecretAccessKey,
      sessionToken: this.props.auth.stsToken.SessionToken
    })

    const s3 = new AWS.S3()
    const bucketName = process.env.AWS_S3_BUCKET_NAME
    const userName = auth.info.username
    const key = userName + '/' + details.name


    var fs = require('fs');
    var fileStream = fs.createReadStream(details.value);

    fileStream.on('error', function(err) {
      console.log('File Error', err);
    });

    // Create the parameters to upload the file with
    var uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fileStream
    };



    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data.Location);
      }
    })

    return fileName
  }

  // perform this when the pop up needs to close
  cancelPopup = () => {
    this.props.onCancelPopup()
  }






  render() {

    const { details } = this.props
    const { uploadProgress } = this.state

    const progressValue = uploadProgress / details.size

    return(
      <PopOverHandler>
        <div id='popup-greyer'>
          <div id='uploader-popover'>
            <div id='popup-box'>
              <div className='uploader-popover-container'>
                <div className='element-title'>
                  {strings.UPLOAD_IN_PROGESS}
                </div>
                <div className='element-description'>
                  <p><b>{strings.FILE_NAME}</b> {details.value.replace("C:\\fakepath\\", "")}</p>
                  <p><b>{strings.UPLOADED_SIZE}</b> {uploadProgress + " / " + details.size}</p>
                </div>
                <ProgressBar
                  intent={Intent.PRIMARY}
                  value={progressValue}
                  />
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }

}

export default Element
