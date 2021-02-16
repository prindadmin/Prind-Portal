import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
  Callout,
} from '@blueprintjs/core'

import PickSignerPopover from '../../../../Common/PickSignerPopover'
import DownloadBox from '../DownloadBox'

import * as Strings from '../../../../../Data/Strings'

// TODO: Get Simon to change "uploadedBy" from "None None" to the users email address

export class CurrentVersion extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    details: PropTypes.object,
    projectID: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.string.isRequired,
    editable: PropTypes.bool,
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
    console.log("Self sign file clicked")
    const { projectID, pageName, fieldID } = this.props
    // Send the request
    this.props.selfSignFile(
      projectID,
      pageName,
      fieldID,
    )
    // Stop the click propagating up and opening the upload history section
    e.stopPropagation();
  }


  // Perform Actions to request a signature
  requestSignature = (e) => {
    console.log("Signature requested")
    // Stop the click proporgating up and opening the upload history section
    e.stopPropagation();
    this.setState({
      signerPickerOpen: true,
    })
  }


  getDetailsTable = () => {
    const { details } = this.props
    return (
      <div className='details-table'>
        <h4>{Strings.FILE_NAME}</h4>
        <div>{details.uploadName !== undefined ? details.uploadName : ""}</div>
        <h4>{Strings.UPLOAD_DATE_TIME}</h4>
        <div>{details.uploadedDateTime !== undefined ? details.uploadedDateTime : ""}</div>
        <h4>{Strings.UPLOADED_BY}</h4>
        <div>{details.uploadedBy !== undefined && details.uploadedBy !== "None None" ? details.uploadedBy : Strings.FILE_UPLOAD_UPLOADER_HAS_NO_NAME}</div>
        <h4>{Strings.PROOF}</h4>
        <div>
          {
            details.proofLink === null  || details.proofLink === undefined ?
              Strings.NO_PROOF_AVAILABLE :
              <div onClick={e => e.stopPropagation()}>
                <a href={details.proofLink} target="_blank" rel="noopener noreferrer">{Strings.LINK_TO_PROOF}</a>
              </div>
          }
        </div>
      </div>
    )
  }


  getDownloadButton = () => {
    const { projectID, pageName, fieldID, details } = this.props
    return (
      <div className="download-box-cell" onClick={(e) => e.stopPropagation()}>
        <DownloadBox
          projectID={projectID}
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
        <div className='row button-row'>
          <Button
            intent={Intent.PRIMARY}
            onClick={(e) => this.requestSignature(e)}
            disabled={!this.state.fileCanBeSign || !this.props.editable}
            text={Strings.BUTTON_REQUEST_SIGNATURES}
          />
          <Button
            intent={Intent.PRIMARY}
            onClick={(e) => this.sendSelfSignRequest(e)}
            disabled={this.state.fileIsSelfSigned || !this.props.editable || noFoundationsID}
            text={Strings.BUTTON_SELF_SIGN_FILE}
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
    const { details, projectID, pageName, fieldID } = this.props
    const { signerPickerOpen } = this.state
    return(
      <div id='current-version-container'>
        <div className='element-title'>
          {Strings.CURRENT_VERSION_ELEMENT}
        </div>
        {
          details === null ? this.currentVersionNotProvided() : this.currentVersionProvided()
        }
        {
          signerPickerOpen ? <PickSignerPopover
            fileDetails={details}
            teamMembers={this.props.projects.memberList}
            projectID={projectID}
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
