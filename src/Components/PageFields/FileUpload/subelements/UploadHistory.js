import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DownloadBox from './DownloadBox'
import Spinner from '../../../Common/LoadingSpinnerCSS'

import * as Strings from '../../../../Data/Strings'

// TODO: FUTURE: Do something with error text state string
export class UploadHistory extends Component {
  static propTypes = {
    details: PropTypes.arrayOf(
      PropTypes.shape({
        uploadName: PropTypes.string.isRequired,
        uploadedBy: PropTypes.string.isRequired,
        ver: PropTypes.string.isRequired,
        uploadedDateTime: PropTypes.string.isRequired,
        proofLink: PropTypes.string
      })
    ).isRequired,
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      fileDetails: {},
      fetchError: false,
      errorText: "",
      downloadInProgress: false
    }
  }


  downloadResolve = () => {
    this.setState({
      downloadInProgress: false,
      fetchError: false,
      errorText: ""
    })
  }

  downloadReject = () => {
    this.setState({
      downloadInProgress: false,
      fetchError: true,
      errorText: Strings.ERROR_FETCHING_DOWNLOAD_LINK
    })
  }


  openProof = (e) => {
    e.stopPropagation()
  }


  getProof = (proofLink) => {
    if (proofLink === undefined) {
      return(
        Strings.NO_PROOF_AVAILABLE
      )
    } else {
      return(
        <a id='proof-link' target="_blank" rel="noopener noreferrer" onClick={e => this.openProof(e)} href={proofLink}>{Strings.LINK_TO_PROOF}</a>
      )
    }
  }

  startDownload = (e) => {
    this.setState({
      downloadInProgress: true,
    })
  }

  getDownloadButton = (fileUpload) => {
    const { projectId, pageName, fieldID } = this.props

    if (this.state.downloadInProgress) {
      return (
        <Spinner size={16} />
      )
    }

    return (
      <div id='download-box-container' onClick={this.startDownload}>
        <DownloadBox
          projectId={projectId}
          pageName={pageName}
          fieldID={fieldID}
          fileVersionDetails={fileUpload}
          onDownloadSuccess={this.downloadResolve}
          onDownloadFailure={this.downloadReject}
          size="small"
          style={{ border: "0px black solid", height: "1.5em", width: "1.5em", alignItems: "flex-start", margin: "auto" }}
        />
      </div>
    )
  }

  // TODO: BUG: Fix the displaying of this details table at mobile widths
  getDetailsTable = () => {
    const { details } = this.props
    var reversedDetails = details.filter(function(fileUpload) {
      return(fileUpload.ver !== "0" && fileUpload.ver !== 0)
    })
    reversedDetails.reverse()
    return (
      <div className='details-table'>
        <h4>{Strings.FILE_NAME}</h4>
        <h4>{Strings.UPLOADED_BY}</h4>
        <h4>{Strings.UPLOAD_VERSION}</h4>
        <h4>{Strings.UPLOAD_DATE_TIME}</h4>
        <h4>{Strings.PROOF}</h4>
        <h4>{Strings.DOWNLOAD_WITH_COLON}</h4>
        {
          reversedDetails.map((fileUpload, index) => {
            return (
              <React.Fragment key={index}>
                <div key={`uploadName-${index}`}>{fileUpload.uploadName? fileUpload.uploadName : Strings.NO_UPLOAD_NAME }</div>
                <div key={`uploadedBy-${index}`}>{fileUpload.uploadedBy === "None None" ? Strings.FILE_UPLOAD_UPLOADER_HAS_NO_NAME : fileUpload.uploadedBy}</div>
                <div key={`ver-${index}`}>{fileUpload.ver}</div>
                <div key={`uploadDateTime-${index}`}>{fileUpload.uploadedDateTime}</div>
                <div key={`proof-${index}`}>
                  {
                    this.getProof(fileUpload.proofLink)
                  }
                </div>
                <div  key={`downloadButton-${index}`}>
                  {
                    this.getDownloadButton(fileUpload)
                  }
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }


  uploadHistoryNotProvided = () => {
    return (
      <div>
        {Strings.NO_PREVIOUS_VERSIONS}
      </div>
    )
  }


  render() {
    const { details } = this.props
    return(
      <div id='upload-history-container'>
        <div className='element-title'>
          {Strings.UPLOAD_HISTORY_ELEMENT}
        </div>
        {
          details.length === 0 ? this.uploadHistoryNotProvided() : this.getDetailsTable()
        }
      </div>
    )
  }
}

export default UploadHistory
