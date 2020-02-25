import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserDetailsForm from './elements/UserDetailsForm'
import PasswordForm from './elements/PasswordForm'

import * as strings from '../../../../data/Strings'

export class Page extends Component {
  static propTypes = {
  }

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

export default Page
