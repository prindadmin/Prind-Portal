import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../../../../ItemIcon'
import PopOverHandler from '../../../../popOverHandler'
import * as strings from '../../../../../../data/Strings'

// TODO: Displaying of file Details
// TODO: Downloading of file version


export class Element extends Component {
  static propTypes = {
    latestFileDetails:  PropTypes.object.isRequired,
    chosenFileDetails: PropTypes.object.isRequired,
    nextFileDetails: PropTypes.object.isRequired,
    previousFileDetails: PropTypes.object.isRequired,
    projectID: PropTypes.any.isRequired,
    pageName: PropTypes.any.isRequired,
    fieldID: PropTypes.any.isRequired,
    onClosePopover: PropTypes.func.isRequired,
  }

  /*
  constructor() {
    super()
    this.state = {
      uploadError: false,
    }
  }
  */

  downloadFile = (e) => {
    console.log("file download starts")
  }

  getDownloadBox = () => {
    return (
      <div className="download-box" onClick={(e) => this.downloadFile(e)}>
        <div>
          <ItemIcon size='4x' type='download' />
          {strings.DOWNLOAD}
        </div>
      </div>
    )
  }

  getContent = () => {

    const { chosenFileDetails, projectID, pageName, fieldID } = this.props

    return (
      <React.Fragment>
        <div className="row">

          <div className="col">
            this will be the file details
          </div>

          <div className="col download-box-cell">
            {this.getDownloadBox()}
          </div>

        </div>
        <div className="row">

          <div className="col">
            this will be the signatures area
          </div>

        </div>
      </React.Fragment>
    )
  }


  getVersionNumber = () => {
    return (
      <div className="version-box">
        this will be the version box
      </div>
    )
  }

  render() {

    const { fileDetails } = this.props
    //const { uploadError } = this.state


    return(
      <PopOverHandler>
        <div id='popup-greyer' onClick={(e) => {
          this.closePopover()
          e.stopPropagation()
          }}>
          <div id='file-details-popover'>
            <div id='popup-box'>
              <div className='file-details-popover-container' onClick={(e) => e.stopPropagation()}>
                <div className='element-title'>
                  {strings.FILE_DETAILS}
                </div>
                <div className='element-description'>
                  {this.getContent()}
                  {this.getVersionNumber()}
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
