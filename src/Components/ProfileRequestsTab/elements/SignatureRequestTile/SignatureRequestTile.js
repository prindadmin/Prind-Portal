import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Strings from '../../../../Data/Strings'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

export class SignatureRequestTile extends Component {
  static propTypes = {
    requestDetails: PropTypes.shape({
      requestedAt: PropTypes.string.isRequired,
      projectID: PropTypes.string.isRequired,
      pageName: PropTypes.string.isRequired,
      fieldID: PropTypes.string.isRequired,
      projectName: PropTypes.string.isRequired,
      fieldTitle: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
      requestedBy: PropTypes.shape({
        username: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    rejectSignatureRequest: PropTypes.func.isRequired,
    updateChosenProject: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired
  }


  // TODO: Implement the history push state in project stage pages
  // https://www.npmjs.com/package/react-scrollable-anchor
  goToDocument = () => {
    const { requestDetails, updateChosenProject } = this.props

    // Build an object for the requested project
    const project = {
      projectId: requestDetails.projectID,
      projectName: requestDetails.projectName,
    }

    // Update the project currently chosen by the user to the project referenced in the request
    updateChosenProject(
      project,
      this.resolveProjectUpdate,
      this.rejectProjectUpdate,
    )
  }


  resolveProjectUpdate = () => {
    const { requestDetails, history } = this.props
    const pathToPush = `${requestDetails.pageName}/${requestDetails.projectID}`
    history.push({
      pathname: pathToPush,
      state: {
        fieldID: requestDetails.fieldID,
        openProjectSelector: false,
      }
    })
  }


  rejectProjectUpdate = () => {
    // TODO: implement this
  }

  rejectSignatureRequest = () => {

    const { requestDetails, rejectSignatureRequest } = this.props

    rejectSignatureRequest(
      requestDetails,
      this.resolveRejectRequest,
      this.rejectRejectRequest
    )
  }

  resolveRejectRequest = () => {
    // TODO: implement this
    //console.log("request was rejected successfully")
  }

  rejectRejectRequest = () => {
    // TODO: implement this
    //console.log("request was NOT rejected successfully")
  }

  render() {

    const { requestDetails } = this.props

    return(
      <div id="signature-request">
        <div className='signature-tile-content-container'>
          <h4>{`${Strings.REQUESTED_BY}:`}</h4>
          <div>{`${requestDetails.requestedBy.firstName} ${requestDetails.requestedBy.lastName}`}</div>
          <h4>{`${Strings.PROJECT_NAME}:`}</h4>
          <div>{`${requestDetails.projectName}`}</div>
          <h4>{`${Strings.PROJECT_STAGE}:`}</h4>
          <div>{`${requestDetails.pageName.replace(/^\w/, c => c.toUpperCase())}`}</div>
          <h4>{`${Strings.FIELD_TITLE}:`}</h4>
          <div>{`${requestDetails.fieldTitle}`}</div>
          <h4>{`${Strings.PROJECT_FILE_NAME}:`}</h4>
          <div>{`${requestDetails.filename}`}</div>
        </div>

        <div className='row button-row'>
          <Button
            id="go-to-document-button"
            intent={Intent.PRIMARY}
            onClick={(e) => this.goToDocument()}
            text={Strings.BUTTON_GO_TO_DOCUMENT}
            icon="document"
          />
          <Button
            id="reject-signature-request-button"
            intent={Intent.DANGER}
            onClick={(e) => this.rejectSignatureRequest()}
            text={Strings.BUTTON_REJECT}
            icon="cross"
          />
        </div>
      </div>
    )
  }
}

export default SignatureRequestTile
