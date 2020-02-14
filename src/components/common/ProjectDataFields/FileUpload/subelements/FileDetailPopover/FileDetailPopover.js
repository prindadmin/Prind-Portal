import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../../../../ItemIcon'
import PopOverHandler from '../../../../popOverHandler'

import SignatureHistory from '../SignatureHistory'

import * as strings from '../../../../../../data/Strings'

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

  componentDidUpdate(prevProps) {

    const { projects } = this.props

    if (projects.downloadURL !== prevProps.projects.downloadURL && projects.downloadURL !== "") {

      // TODO: Once signed URLs from the API are sorted, then uncomment the commented line and delete the current line
      //window.location.href = projects.downloadURL
      window.open(projects.downloadURL, "_blank")
    }

  }

  componentWillUnmount() {
    this.props.resetDownloadURL()
  }

  downloadFile = (e) => {

    const { auth, projectID, pageName, fieldID, chosenFileDetails } = this.props

    this.props.downloadFile(
      auth.info.idToken.jwtToken,
      projectID,
      pageName,
      fieldID,
      chosenFileDetails.ver,
    )

  }

  getFileDetailsArea = () => {

    const { chosenFileDetails } = this.props

    return (
      <div className="file-details">
        <div className='row'>
          <div className='field-names col-4'>
            <div>{strings.FILE_NAME}</div>
            <div>{strings.UPLOAD_DATE_TIME}</div>
            <div>{strings.UPLOADED_BY}</div>
            <div>{strings.PROOF}</div>
          </div>

          <div className='field-values col-auto'>
            <div>{chosenFileDetails.uploadName}</div>
            <div>{chosenFileDetails.uploadDateTime}</div>
            <div>{chosenFileDetails.uploadedBy}</div>
            {
              chosenFileDetails.proofLink === null ?
                strings.NO_PROOF_AVAILABLE :
                <div onClick={e => e.stopPropagation()}>
                  <a href={chosenFileDetails.proofLink}>{strings.LINK_TO_PROOF}</a>
                </div>
            }
          </div>
        </div>
      </div>
    )
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


  getSignaturesArea = () => {

    const { chosenFileDetails } = this.props

    return (
      <div className="signature-details">
        <div>
          <SignatureHistory
            details={chosenFileDetails.signatures}
          />
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
            {this.getFileDetailsArea()}
          </div>

          <div className="col download-box-cell">
            {this.getDownloadBox()}
          </div>

        </div>
        <div className="row">

          <div className="col">
            {this.getSignaturesArea()}
          </div>

        </div>
      </React.Fragment>
    )
  }

  render() {

    const { fileDetails } = this.props

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
