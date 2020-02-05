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
    const file = details.files[0]
    const now = new Date();
    const isoDateTime = now.toISOString().split('.')[0]

    var fileName = file.name

    // Create the S3
    AWS.config.update({
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: auth.s3Token.body.AccessKeyId,
      secretAccessKey: auth.s3Token.body.SecretAccessKey,
      sessionToken: auth.s3Token.body.SessionToken
    })

    // FIXME: The key will by projectID/pageName/fieldID
    // FIXME: The filename for the S3 file will be the uploaded filename

    const s3 = new AWS.S3()
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const userName = auth.info.username
    const key = userName + '/' + isoDateTime + '_' + fileName

    // Create the parameters to upload the file with
    var uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: file.type,
      ACL: 'private'
    };



    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data);
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
