import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as strings from '../../../../../../Data/Strings'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

export class Element extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    requestDetails: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
      projectName: PropTypes.string.isRequired,
      requestedBy: PropTypes.string.isRequired,
      requestedAt: PropTypes.string.isRequired,
      roleId: PropTypes.string.isRequired,
      requestedByUser: PropTypes.string.isRequired,
    }).isRequired,
    respondToProjectInvitation: PropTypes.func.isRequired,
  }

  acceptInvitation = () => {

    const { requestDetails, respondToProjectInvitation } = this.props

    respondToProjectInvitation(
      requestDetails.projectId,
      true,
    )
  }

  rejectInvitation = () => {

    const { requestDetails, respondToProjectInvitation } = this.props

    respondToProjectInvitation(
      requestDetails.projectId,
      false,
    )
  }


  render() {

    const { requestDetails } = this.props

    return(
      <div id="project-invitation-request">
        <h4 className='bp3-heading'>{strings.PROJECT_INVITATION}</h4>
        <div className='bp3-heading'>{`${strings.PROJECT_NAME}: ${requestDetails.projectName}`}</div>
        <div className='row button-row'>
          <Button
            intent={Intent.PRIMARY}
            onClick={(e) => this.acceptInvitation()}
            text={strings.BUTTON_ACCEPT}
            icon="tick"
          />
          <Button
            intent={Intent.DANGER}
            onClick={(e) => this.rejectInvitation()}
            text={strings.BUTTON_REJECT}
            icon="cross"
          />
        </div>
      </div>
    )
  }
}

export default Element
