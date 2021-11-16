import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Callout,
} from '@blueprintjs/core'

import PickSignerPopover from '../../../../Common/PickSignerPopover'
import DownloadBox from '../DownloadBox'

import * as Strings from '../../../../../Data/Strings'

// TODO: FUTURE: Get Simon to change "uploadedBy" from "None None" to the users email address
// TODO: FUTURE: Remove blueprintjs

export class CurrentVersion extends Component {
  static propTypes = {
    user: PropTypes.shape({
      details: PropTypes.shape({
        foundationsID: PropTypes.string
      }).isRequired
    }).isRequired,
    details: PropTypes.shape({
      uploadName: PropTypes.string.isRequired,
      uploadedDateTime: PropTypes.number.isRequired,
      uploadedBy: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      proofLink: PropTypes.string,
    }),
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string.isRequired,
      })
    }),
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    selfSignFile: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      fileIsSelfSigned: false,
      fileCanBeSign: true,
      signerPickerOpen: false,
      fetchError: false,
      errorText: "",
    }
  }

  onClosePopover = () => {
    this.setState({
      signerPickerOpen: false,
    })
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


  // Perform Actions to request your own signature
  sendSelfSignRequest = (e) => {
    //console.log("Self sign file clicked")
    const { pageName, fieldID } = this.props
    const { projectId } = this.props.projects.chosenProject
    // Send the request
    this.props.selfSignFile(
      projectId,
      pageName,
      fieldID,
    )
    // Stop the click propagating up
    e.stopPropagation();
  }


  // Perform Actions to request a signature
  requestSignature = (e) => {
    //console.log("Signature requested")
    // Stop the click propagating up
    e.stopPropagation();
    this.setState({
      signerPickerOpen: true,
    })
  }

  // TODO: URGENT: This link to the proof isn't working but the link in the versions tab is
  getDetailsTable = () => {
    const { details } = this.props
    console.log("Current version details:", details)

    const uploadedDate = !details.uploadedDateTime ? undefined : new Date(details.uploadedDateTime * 1000)

    var endOfProofLink;
    var entryHash;
    try {
      if (details.proofLink) {
        endOfProofLink = details.proofLink.split("/").slice(-1)[0]
        entryHash = endOfProofLink.replace("entry?hash=", "")
      }
    } catch (err) {
      console.warn("Error when getting entryhash", err)
    }


    return (
      <div className='details-table'>
        <h4>{Strings.FILE_NAME}</h4>
        <div>{!details.uploadName ? "" : details.uploadName }</div>
        <h4>{Strings.UPLOAD_DATE_TIME}</h4>
        <div>{!uploadedDate ? Strings.ERROR_DATE_UNAVAILABLE : uploadedDate.toLocaleString()}</div>
        <h4>{Strings.UPLOADED_BY}</h4>
        <div>{!details.uploadedBy || details.uploadedBy !== "None None" ? Strings.FILE_UPLOAD_UPLOADER_HAS_NO_NAME : details.uploadedBy }</div>
        <h4>{Strings.PROOF}</h4>
        <div>
          {
            !details.proofLink ?
              Strings.PROOF_STILL_PROCESSING :
              <div id='proof-link-container' onClick={e => e.stopPropagation()}>
                <a id="proof-link" href={`${process.env.REACT_APP_FACTOM_EXPLORER_SITE}/entries/${entryHash}`} target="_blank" rel="noopener noreferrer">{Strings.LINK_TO_PROOF}</a>
              </div>
          }
        </div>
      </div>
    )
  }


  getDownloadButton = () => {
    const { pageName, fieldID, details } = this.props
    const { projectId } = this.props.projects.chosenProject
    return (
      <div className="download-box-cell" onClick={(e) => e.stopPropagation()}>
        <DownloadBox
          projectId={projectId}
          pageName={pageName}
          fieldID={fieldID}
          fileVersionDetails={details}
          onDownloadSuccess={this.downloadResolve}
          onDownloadFailure={this.downloadReject}
        />
      </div>
    )
  }


  currentVersionProvided = () => {
    const { user } = this.props
    const { fetchError, errorText } = this.state
    const noFoundationsID = user.details.foundationsID === undefined || user.details.foundationsID === null

    return (
      <React.Fragment>
        {
          fetchError ?
            <Callout style={{marginBottom: '15px'}} intent='danger'>
              <div>{errorText}</div>
            </Callout> :
            null
        }
        {
          this.getDetailsTable()
        }
        {
          noFoundationsID ?
            <div className='row button-row'>
              <Callout className='no-foundations-id' intent='danger'>
                <div>
                  { Strings.CANNOT_SIGN_WITHOUT_FOUNDATIONS_ID }
                </div>
              </Callout>
            </div> :
            null
        }
        <div className='row button-row' style={{ marginTop: "1rem" }}>
          <input
            id='request-signatures-button'
            className='button'
            type='submit'
            onClick={(e) => this.requestSignature(e)}
            disabled={!this.state.fileCanBeSign || !this.props.editable}
            value={Strings.BUTTON_REQUEST_SIGNATURES}
          />
          <input
            id='self-sign-button'
            className='button'
            type='submit'
            onClick={(e) => this.sendSelfSignRequest(e)}
            disabled={this.state.fileIsSelfSigned || !this.props.editable || noFoundationsID}
            value={Strings.BUTTON_SELF_SIGN_FILE}
          />
        </div>
        {
          this.getDownloadButton()
        }
      </React.Fragment>
    )
  }


  currentVersionNotProvided = () => {
    return (
      <div>
        {Strings.NO_CURRENT_VERSION}
      </div>
    )
  }


  render() {
    const { details, pageName, fieldID } = this.props
    const { projectId } = this.props.projects.chosenProject
    const { signerPickerOpen } = this.state
    return(
      <div id='current-version-container'>
        <div className='element-title'>
          {Strings.CURRENT_VERSION_ELEMENT}
        </div>
        {
          !details || Object.keys(details).length === 0 ? this.currentVersionNotProvided() : this.currentVersionProvided()
        }
        {
          signerPickerOpen ? <PickSignerPopover
            fileDetails={details}
            teamMembers={this.props.projects.memberList}
            projectId={projectId}
            pageName={pageName}
            fieldID={fieldID}
            onClosePopover={this.onClosePopover}
          /> : null
        }
      </div>
    )
  }
}

export default CurrentVersion
