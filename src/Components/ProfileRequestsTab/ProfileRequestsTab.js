import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Strings from '../../Data/Strings'

import {
  ProjectInvitationTile,
  SignatureRequestTile,
} from './elements'

import ItemIcon from '../Common/ItemIcon'

export class ProfileRequestsTab extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }


  getSignatureRequestContainer = () => {
    const { user } = this.props
    return (
      <div className='requests-section signature-requests'>
        <div className='element-title'>
          {Strings.SIGNATURE_REQUESTS}
        </div>
        <div className='signature-request-container'>
          {
            user.signatureRequests.map((request, index) => {
              return <SignatureRequestTile requestDetails={request} />
            })
          }
        </div>
      </div>
    )
  }

  hasContent = () => {
    const { user } = this.props
    return (
      <React.Fragment>
        <div className='requests-section project-invitations'>
          {
            user.projectInvitations.length > 0 ?
            <div className='element-title'>
              {Strings.PROJECT_INVITATIONS}
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
        {
          user.signatureRequests.length > 0 ? this.getSignatureRequestContainer() : null
        }
      </React.Fragment>
    )
  }


  hasNoContent = () => {
    return (
      <div className='no-requests-container fill'>
        <div className='no-requests'>
          <ItemIcon size='6x' type='ticked' />
          <p>{Strings.NO_REQUESTS}</p>
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
