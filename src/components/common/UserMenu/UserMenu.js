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

// TODO: Use Strings rather than hard coded text for menu items

class UserMenu extends Component {
  static propTypes = {
    user: PropTypes.shape({
      signatureRequests: PropTypes.array.isRequired,
      projectInvitations: PropTypes.array.isRequired,
    }).isRequired,
    getUserProjectInvitations: PropTypes.func.isRequired,
    getUserSignatureRequests: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    })
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


  hasNotifications = () => {
    const { user } = this.props
    return user.signatureRequests.length + user.projectInvitations.length > 0
  }

  getIcon = () => {
    const { user } = this.props
    const hasNotifications = this.hasNotifications()
    return (
      <React.Fragment>
        <Icon icon={ico} />
        {
          hasNotifications ? this.getRequestBadge() : null
        }
      </React.Fragment>
    )
  }


  signOut = async (values) => {
    await this.props.signOut(values)
  }


  openProfile = (values) => {
    this.props.history.push({
      pathname: '/profile',
    })
  }


  openNotifications = (values) => {
    const { user } = this.props
    this.props.history.push({
      pathname: '/profile',
      state: { tabToOpen: 'requests' },
    })
  }


  dropdownContent = <Menu>
    <Menu.Item text='Profile' onClick={this.openProfile}/>
    {
      this.hasNotifications() ? <Menu.Item text='Notifications' onClick={this.openNotifications}/> : null
    }
    <Menu.Item text='Sign Out' onClick={this.signOut} />
  </Menu>


  render () {
    return <Popover id='popover' content={this.dropdownContent} position='bottom'>
      {this.getIcon()}
    </Popover>
  }
}

export default UserMenu
