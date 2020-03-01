import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Callout,
} from '@blueprintjs/core'

import ItemIcon from '../../../../ItemIcon'
import DownloadBox from '../DownloadBox'
import PopOverHandler from '../../../../popOverHandler'

import SignatureHistory from '../SignatureHistory'

import * as strings from '../../../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    //latestFileDetails:  PropTypes.object.isRequired,
    chosenFileDetails: PropTypes.shape({
      uploadName: PropTypes.string.isRequired,
      uploadDateTime: PropTypes.string.isRequired,
      uploadedBy: PropTypes.string.isRequired,
      proofLink: PropTypes.string,
    }).isRequired,
    //nextFileDetails: PropTypes.object.isRequired,
    //previousFileDetails: PropTypes.object.isRequired,
    projectID: PropTypes.any.isRequired,
    pageName: PropTypes.any.isRequired,
    fieldID: PropTypes.any.isRequired,
    onClosePopover: PropTypes.func.isRequired,
  }


  constructor() {
    super()
    this.state = {
      fetchError: false,
      errorText: ""
    }
  }

  downloadResolve = () => {
    this.setState({
      fetchError: false,
      errorText: ""
    })
  }


  downloadReject = () => {
    this.setState({
      fetchError: true,
      errorText: strings.ERROR_FETCHING_DOWNLOAD_LINK
    })
  }


  // Trigger the closing of the popover
  closePopover = () => {
    this.props.onClosePopover()
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
            <div>{chosenFileDetails.uploadName !== undefined ? chosenFileDetails.uploadName : strings.NO_UPLOAD_NAME}</div>
            <div>{chosenFileDetails.uploadedDateTime !== undefined ? chosenFileDetails.uploadedDateTime : <br />}</div>
            <div>{chosenFileDetails.uploadedBy !== undefined ? chosenFileDetails.uploadedBy : <br />}</div>
            {
              chosenFileDetails.proofLink === undefined ?
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

    const { projectID, pageName, fieldID, chosenFileDetails } = this.props
    const { fetchError, errorText } = this.state

    return (
      <React.Fragment>
        <div className="row">

          <div className="col">
            {this.getFileDetailsArea()}
          </div>

          <div className="col download-box-cell">
            <DownloadBox
              projectID={projectID}
              pageName={pageName}
              fieldID={fieldID}
              fileVersionDetails={chosenFileDetails}
              onDownloadSuccess={this.downloadResolve}
              onDownloadFailure={this.downloadReject}
            />
          </div>

        </div>
        {
          fetchError ?
          <div className="row">
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{errorText}</div>
            </Callout>
          </div> :
          null
        }
        <div className="row">

          <div className="col">
            {this.getSignaturesArea()}
          </div>

        </div>
      </React.Fragment>
    )
  }

  render() {

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
