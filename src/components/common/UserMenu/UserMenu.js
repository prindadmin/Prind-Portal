import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import {
  Popover,
  Menu,
  Icon
} from '@blueprintjs/core'

const ico = <FontAwesomeIcon icon={faUserCircle} size='3x' />

// TODO: Show how many requests a user has

class UserMenu extends Component {
  signOut = async (values) => {
    await this.props.signOut(values)
  }

  openProfile = (values) => {
    this.props.history.push('/Profile')
  }

  dropdownContent = <Menu>
    <Menu.Item text='Profile' onClick={this.openProfile}/>
    <Menu.Item text='Sign Out' onClick={this.signOut} />
  </Menu>

  render () {
    return <Popover content={this.dropdownContent} position='bottom'>
      <Icon icon={ico} />
    </Popover>
  }
}

export default UserMenu
