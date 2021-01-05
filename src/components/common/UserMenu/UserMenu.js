import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import {
  Popover,
  Menu,
  Icon
} from '@blueprintjs/core'

const ico = <FontAwesomeIcon icon={faUserCircle} size='3x' />

class UserMenu extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getUserProjectInvitations: PropTypes.func.isRequired,
    getUserSignatureRequests: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  componentDidMount() {

    // This next part fetches all the invitations and requests so they can be
    // counted and a badge displayed on the user menu if more than 0

    const { getUserProjectInvitations, getUserSignatureRequests } = this.props

    // Get the user project invitations
    getUserProjectInvitations(
      this.projectRequestsResolve,
      this.projectRequestsReject,
    )

    // Get the user signature requests
    getUserSignatureRequests(
      this.signatureRequestsResolve,
      this.signatureRequestsReject,
    )
  }

  projectRequestsResolve = () => {
  }

  projectRequestsReject = () => {
  }

  signatureRequestsResolve = () => {
  }

  signatureRequestsReject = () => {
  }

  getRequestBadge = () => {

    const { user } = this.props

    return (
      <div className='request-badge'>
        { user.signatureRequests.length + user.projectInvitations.length < 10 ? user.signatureRequests.length + user.projectInvitations.length : "+" }
      </div>
    )
  }


  getIcon = () => {

    const { user } = this.props

    return (
      <React.Fragment>
        <Icon icon={ico} />
        {
          user.signatureRequests.length + user.projectInvitations.length > 0 ? this.getRequestBadge() : null
        }
      </React.Fragment>
    )
  }

  signOut = async (values) => {
    await this.props.signOut(values)
  }

  openProfile = (values) => {

    const { user } = this.props

    if (user.signatureRequests.length + user.projectInvitations.length > 0) {
      this.props.history.push({
        pathname: '/profile',
        state: { tabToOpen: 'requests' },
      })
      return;
    }

    this.props.history.push({
      pathname: '/profile',
    })

  }

  dropdownContent = <Menu>
    <Menu.Item text='Profile' onClick={this.openProfile}/>
    <Menu.Item text='Sign Out' onClick={this.signOut} />
  </Menu>

  render () {

    return <Popover content={this.dropdownContent} position='bottom'>
      {this.getIcon()}
    </Popover>
  }
}

export default UserMenu
