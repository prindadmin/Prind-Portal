import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as strings from '../../../../../../data/Strings'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

export class Element extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
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
    respondToSignatureInvitation: PropTypes.func.isRequired,
  }


  // TODO: Implement the history push state in all the project stage pages
  goToDocument = () => {
    const { auth, requestDetails, updateChosenProject } = this.props

    // Build an object for the requested project
    const project = {
      projectId: requestDetails.projectID,
      projectName: requestDetails.projectName,
    }

    // Update the project currently chosen by the user to the project referenced in the request
    updateChosenProject(
      auth.info.idToken.jwtToken,
      project,
      this.resolveProjectUpdate,
      this.rejectProjectUpdate,
    )

  }


  resolveProjectUpdate = () => {
    const { requestDetails, history } = this.props
    const pageToPush = requestDetails.pageName.replace(/^\w/, c => c.toUpperCase())

    history.push({
      pathname: pageToPush,
      state: {
        fieldID: requestDetails.fieldID
      }
    })
  }


  rejectProjectUpdate = () => {
    // TODO: implement this
  }

  rejectSignatureRequest = () => {

    const { auth, requestDetails, respondToSignatureInvitation } = this.props

    respondToSignatureInvitation(
      auth.info.idToken.jwtToken,
      requestDetails,
      false,
    )
  }


  render() {

    const { requestDetails } = this.props

    return(
      <div id="signature-request">
        <h4 className='bp3-heading'>{strings.SIGNATURE_REQUEST}</h4>

        <span className='horizontal-flex' style={{whiteSpace: 'pre'}}>
          <div className='bp3-heading'>{`${strings.REQUESTED_BY}:   `}</div>
          <div>{`${requestDetails.requestedBy.firstName} ${requestDetails.requestedBy.lastName}`}</div>
        </span>

        <span className='horizontal-flex' style={{whiteSpace: 'pre'}}>
          <div className='bp3-heading'>{`${strings.PROJECT_NAME}:   `}</div>
          <div>{`${requestDetails.projectName}`}</div>
        </span>

        <span className='horizontal-flex' style={{whiteSpace: 'pre'}}>
          <div className='bp3-heading'>{`${strings.PROJECT_STAGE}:   `}</div>
          <div>{`${requestDetails.pageName.replace(/^\w/, c => c.toUpperCase())}`}</div>
        </span>

        <span className='horizontal-flex' style={{whiteSpace: 'pre'}}>
          <div className='bp3-heading'>{`${strings.FIELD_TITLE}:   `}</div>
          <div>{`${requestDetails.fieldTitle}`}</div>
        </span>

        <span className='horizontal-flex' style={{whiteSpace: 'pre'}}>
          <div className='bp3-heading'>{`${strings.PROJECT_FILE_NAME}:   `}</div>
          <div>{`${requestDetails.filename}`}</div>
        </span>

        <div className='row button-row'>
          <Button
            intent={Intent.PRIMARY}
            onClick={(e) => this.goToDocument()}
            text={strings.BUTTON_GO_TO_DOCUMENT}
            icon="document"
          />
          <Button
            intent={Intent.DANGER}
            onClick={(e) => this.rejectSignatureRequest()}
            text={strings.BUTTON_REJECT}
            icon="cross"
          />
        </div>
      </div>
    )
  }
}

export default Element
