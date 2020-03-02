import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
  Callout,
} from '@blueprintjs/core'

// TODO: Add File Download to current version tile

import SignatureHistory from '../SignatureHistory'

import PickSignerPopover from '../../../../PickSignerPopover'
import DownloadBox from '../DownloadBox'

import * as strings from '../../../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    details: PropTypes.object,
    projectID: PropTypes.string,
    pageName: PropTypes.string,
    fieldID: PropTypes.string,
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
      errorText: strings.ERROR_FETCHING_DOWNLOAD_LINK
    })
  }


  // Perform actions to request your own signature
  sendSelfSignRequest = (e) => {
    console.log("Self sign file clicked")

    console.log(e)
    console.log(this.props)

    const { projectID, pageName, fieldID, auth } = this.props

    // Create the arguments for the request
    const fileDetails = {
      projectID,
      pageName,
      fieldID,
      signer: auth.username,
    }

    // Send the request
    this.props.selfSignFile(
      auth.info.idToken.jwtToken,
      fileDetails,
    )

    // Stop the click proporgating up and opening the upload history section
    e.stopPropagation();
  }



  // Perform actions to request a signature
  requestSignature = (e) => {
    console.log("Signature requested")

    // Stop the click proporgating up and opening the upload history section
    e.stopPropagation();

    this.setState({
      signerPickerOpen: true,
    })

  }


  currentVersionProvided = () => {

    const { projectID, pageName, fieldID, details } = this.props
    const { fetchError, errorText } = this.state

    return (
      <React.Fragment>

        <div className='row align-items-start'>
          <div className='col-10'>


            <div className='row'>
              <div className='element-title'>
                {strings.CURRENT_VERSION_ELEMENT}
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

            <div className='row'>
              <div className='field-names col-4 col-lg-3 col-xl-2'>
                <div>{strings.FILE_NAME}</div>
                <div>{strings.UPLOAD_DATE_TIME}</div>
                <div>{strings.UPLOADED_BY}</div>
                <div>{strings.PROOF}</div>
              </div>

              <div className='field-values col-auto'>
                <div>{details.uploadName !== undefined ? details.uploadName : <br />}</div>
                <div>{details.uploadedDateTime !== undefined ? details.uploadedDateTime : <br />}</div>
                <div>{details.uploadedBy !== undefined ? details.uploadedBy : <br />}</div>
                {
                  details.proofLink === null  || details.proofLink === undefined ?
                    strings.NO_PROOF_AVAILABLE :
                    <div onClick={e => e.stopPropagation()}>
                      <a href={details.proofLink}>{strings.LINK_TO_PROOF}</a>
                    </div>
                }
              </div>
            </div>

            <div className='row button-row'>
              <Button
                intent={Intent.PRIMARY}
                onClick={(e) => this.requestSignature(e)}
                disabled={!this.state.fileCanBeSign || !this.props.editable}
                text={strings.BUTTON_REQUEST_SIGNATURES}
              />
              <Button
                intent={Intent.PRIMARY}
                onClick={(e) => this.sendSelfSignRequest(e)}
                disabled={this.state.fileIsSelfSigned || !this.props.editable}
                text={strings.BUTTON_SELF_SIGN_FILE}
              />
            </div>

            <div className='row section-margin'>
              <SignatureHistory
                details={details.signatures}
              />
            </div>
          </div>


          <div className='col-2'>
            <div className="col download-box-cell" onClick={(e) => e.stopPropagation()}>
              <DownloadBox
                projectID={projectID}
                pageName={pageName}
                fieldID={fieldID}
                fileVersionDetails={details}
                onDownloadSuccess={this.downloadResolve}
                onDownloadFailure={this.downloadReject}
              />
            </div>
          </div>


        </div>
      </React.Fragment>
    )
  }

  currentVersionNotProvided = () => {
    return (
      <div>
        {strings.NO_CURRENT_VERSION}
      </div>
    )
  }

  render() {

    const { details, projectID, pageName, fieldID } = this.props
    const { signerPickerOpen } = this.state

    return(
      <div id='current-version-container'>
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

export default Element
