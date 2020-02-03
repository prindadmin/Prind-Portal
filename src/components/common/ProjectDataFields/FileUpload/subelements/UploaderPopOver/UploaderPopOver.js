import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PopOverHandler from '../../../../popOverHandler'

import {
  ProgressBar,
  Intent,
} from '@blueprintjs/core'


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

    // TODO: Replace this with an upload and fire cancel when complete
    setTimeout(() => {
      this.cancelPopup();
    }, 25000);


    // TODO: Upload the file to S3
    const fileName = details.value

    this.props.uploadFile(
      this.props.auth.info.idToken.jwtToken,
      this.props.pageName,
      fileName,
    )
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
