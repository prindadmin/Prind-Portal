import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PopOverHandler from '../../../../popOverHandler'
import * as strings from '../../../../../../data/Strings'

// TODO: Displaying of file Details
// TODO: Downloading of file version


export class Element extends Component {
  static propTypes = {
    fileDetails: PropTypes.object.isRequired,
    projectID: PropTypes.any.isRequired,
    pageName: PropTypes.any.isRequired,
    fieldID: PropTypes.any.isRequired,
    onClosePopup: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      uploadError: false,
    }
  }

  render() {

    const { fileDetails } = this.props
    const { uploadError } = this.state

    const uploadStatus = uploadError ? "error" : ""


    return(
      <PopOverHandler>
        <div id='popup-greyer'>
          <div id='uploader-popover'>
            <div id='popup-box' className={uploadStatus}>
              <div className='file-details-popover-container' onClick={(e) => {
                this.props.onClosePopup()
                e.stopPropagation()
                }}>
                <div className='element-title'>
                  {strings.UPLOAD_IN_PROGESS}
                </div>
                <div className='element-description'>
                  <p><b>This is the popover for the file details</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }

}

export default Element
