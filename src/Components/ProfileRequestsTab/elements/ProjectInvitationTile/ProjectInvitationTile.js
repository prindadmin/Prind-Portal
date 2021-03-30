import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Strings from '../../../../Data/Strings'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

export class ProjectInvitationTile extends Component {
  static propTypes = {
    requestDetails: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
      projectName: PropTypes.string.isRequired,
      requestedBy: PropTypes.string,
      requestedAt: PropTypes.string,
      roleId: PropTypes.string,
      requestedByUser: PropTypes.string,
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
        <h4 className='bp3-heading'>{Strings.PROJECT_INVITATION}</h4>
        <div className='bp3-heading'>{`${Strings.PROJECT_NAME}: ${requestDetails.projectName}`}</div>
        <div className='row button-row'>
          <Button
            id='accept-button'
            intent={Intent.PRIMARY}
            onClick={(e) => this.acceptInvitation()}
            text={Strings.BUTTON_ACCEPT}
            icon="tick"
          />
          <Button
            id='reject-button'
            intent={Intent.DANGER}
            onClick={(e) => this.rejectInvitation()}
            text={Strings.BUTTON_REJECT}
            icon="cross"
          />
        </div>
      </div>
    )
  }
}

export default ProjectInvitationTile
