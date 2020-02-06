import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import SignatureHistory from '../SignatureHistory'

import * as strings from '../../../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    details: PropTypes.object,
    projectID: PropTypes.any,
    pageName: PropTypes.any,
    fieldID: PropTypes.any,
  }

  constructor() {
    super()
    this.state = {
      fileIsSelfSigned: false,
      fileCanBeSign: true,
    }
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

    const { projectID, pageName, fieldID, auth } = this.props

    // TODO: Create the arguments for the request
    const fileDetails = {
      projectID,
      pageName,
      fieldID,
      signer: "TODO@TODO.com",
    }

    // Send the request
    this.props.requestFileSignature(
      auth.info.idToken.jwtToken,
      fileDetails,
    )

    // Stop the click proporgating up and opening the upload history section
    e.stopPropagation();
  }


  currentVersionProvided = () => {

    const { details } = this.props

    return (
      <div>

        <div className='row'>
          <div className='element-title'>
            {strings.CURRENT_VERSION_ELEMENT}
          </div>
        </div>

        <div className='row'>
          <div className='field-names col-4 col-lg-3 col-xl-2'>
            <div>{strings.FILE_NAME}</div>
            <div>{strings.UPLOAD_DATE_TIME}</div>
            <div>{strings.UPLOADED_BY}</div>
            <div>{strings.PROOF}</div>
          </div>

          <div className='field-values col-auto'>
            <div>{details.uploadName}</div>
            <div>{details.uploadDateTime}</div>
            <div>{details.uploadedBy}</div>
            {
              details.proofLink === null ?
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
            onClick={(e) => this.sendSelfSignRequest(e)}
            disabled={this.state.fileIsSelfSigned}
            text={strings.BUTTON_SELF_SIGN_FILE}
          />
          <Button
            intent={Intent.PRIMARY}
            onClick={(e) => this.requestSignature(e)}
            disabled={!this.state.fileCanBeSign}
            text={strings.BUTTON_REQUEST_SIGNATURE}
          />
        </div>

        <div className='row section-margin'>
          <SignatureHistory
            details={details.signatures}
          />
        </div>
      </div>
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

    const { details } = this.props

    return(
      <div className='current-version-container'>
        {
          details === null ? this.currentVersionNotProvided() : this.currentVersionProvided()
        }
      </div>


    )
  }

}

export default Element
