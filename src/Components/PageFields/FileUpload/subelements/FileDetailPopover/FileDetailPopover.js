import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Callout,
} from '@blueprintjs/core'

import DownloadBox from '../DownloadBox'
import PopOverHandler from '../../../../Common/popOverHandler'

import SignatureHistory from '../SignatureHistory'

import * as Strings from '../../../../../Data/Strings'

export class FileDetailPopover extends Component {
  static propTypes = {
    chosenFileDetails: PropTypes.shape({
      uploadName: PropTypes.string.isRequired,
      uploadDateTime: PropTypes.string.isRequired,
      uploadedBy: PropTypes.string.isRequired,
      proofLink: PropTypes.string,
    }).isRequired,
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
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
      errorText: Strings.ERROR_FETCHING_DOWNLOAD_LINK
    })
  }


  // Trigger the closing of the popover
  closePopover = () => {
    this.props.onClosePopover()
  }

  getFileDetailsArea = () => {

    const { chosenFileDetails } = this.props

    const endOfProofLink = chosenFileDetails.proofLink.split("/").slice(-1)[0]
    const entryHash = endOfProofLink.replace("entry?hash=", "")

    return (
      <div className="file-details">
        <div className='row'>
          <div className='field-names col-4'>
            <div>{Strings.FILE_NAME}</div>
            <div>{Strings.UPLOAD_DATE_TIME}</div>
            <div>{Strings.UPLOADED_BY}</div>
            <div>{Strings.PROOF}</div>
          </div>

          <div className='field-values col-auto'>
            <div>{chosenFileDetails.uploadName !== undefined ? chosenFileDetails.uploadName : Strings.NO_UPLOAD_NAME}</div>
            <div>{chosenFileDetails.uploadedDateTime !== undefined ? chosenFileDetails.uploadedDateTime : <br />}</div>
            <div>{chosenFileDetails.uploadedBy !== undefined ? chosenFileDetails.uploadedBy : <br />}</div>
            {
              chosenFileDetails.proofLink === undefined ?
                Strings.NO_PROOF_AVAILABLE :
                <div id='proof-link-container' onClick={e => e.stopPropagation()}>
                  <a href={`${process.env.REACT_APP_FACTOM_EXPLORER_SITE}/entries/${entryHash}`} target="_blank" rel="noopener noreferrer">{Strings.LINK_TO_PROOF}</a>
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

    const { pageName, fieldID, chosenFileDetails } = this.props
    const { projectId } = this.props.projects.chosenProject
    const { fetchError, errorText } = this.state

    return (
      <React.Fragment>
        <div className="row">

          <div className="col">
            {this.getFileDetailsArea()}
          </div>

          <div className="col download-box-cell">
            <DownloadBox
              projectId={projectId}
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
                  {Strings.FILE_DETAILS}
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

export default FileDetailPopover
