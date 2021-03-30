import React, { Component } from 'react'
//import PropTypes from 'prop-types'

import UserDetailsForm from './elements/UserDetailsForm'
import PasswordForm from './elements/PasswordForm'

export class ProfileUserTab extends Component {
  static propTypes = {}

  render() {
    return(
      <div className="tab-pane active">
        <UserDetailsForm />
        <div className="horizontal-line" />
        <PasswordForm />
      </div>
    )
  }
}

export default ProfileUserTab
