import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as strings from '../../Data/Strings'

import {
  ProjectInvitationTile,
  SignatureRequestTile,
} from './elements'

import ItemIcon from '../common/ItemIcon'

export class ProfileRequestsTab extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super()
  }


  hasContent = () => {

    const { user } = this.props

    return (
      <React.Fragment>
        <div className='requests-section project-invitations'>
          {
            user.projectInvitations.length > 0 ?
            <div className='element-title'>
              {strings.PROJECT_INVITATIONS}
            </div> : null
          }
          {
            user.projectInvitations.length > 0 ? user.projectInvitations.map((request, index) => {
              return (
                <div key={index} className="col-md-12 col-lg-6 col-xl-4">
                  <ProjectInvitationTile requestDetails={request} />
                </div>
              )
            }) : null
          }
        </div>
        {
          user.projectInvitations.length > 0 && user.signatureRequests.length > 0 ? <div className='horizontal-line' /> : null
        }
        <div className='requests-section signature-requests'>
          {
            user.signatureRequests.length > 0 ?
            <div className='element-title'>
              {strings.SIGNATURE_REQUESTS}
            </div> : null
          }
          {
            user.signatureRequests.length > 0 ? user.signatureRequests.map((request, index) => {
              return (
                <div key={index} className="col-md-12 col-lg-6 col-xl-4">
                  <SignatureRequestTile requestDetails={request} />
                </div>
              )
            }) : null
          }
        </div>
      </React.Fragment>
    )
  }


  hasNoContent = () => {
    return (
      <div className='no-requests-container fill'>
        <div className='no-requests'>
          <ItemIcon size='6x' type='ticked' />
          <p>{strings.NO_REQUESTS}</p>
        </div>
      </div>
    )
  }


  render() {

    const { user } = this.props

    return(
      <div className="tab-pane active">
        <div className='row'>
          <div id="requests-tab-container">
            {
              user.projectInvitations.length + user.signatureRequests.length === 0 ? this.hasNoContent() : this.hasContent()
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileRequestsTab
