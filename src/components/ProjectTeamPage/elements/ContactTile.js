import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Callout,
  Intent,
} from '@blueprintjs/core'

// TODO: Improve look of tiles

import * as strings from '../../../data/Strings'

export class ContactTile extends Component {
  static propTypes = {
    memberDetails: PropTypes.object.isRequired,
  }

  render() {

    const { memberDetails } = this.props
    console.log(memberDetails)

    return (
        <div id='contact-tile'>
          <Callout
            icon="user"
            intent={Intent.NONE}
            title={memberDetails.firstName + " " + memberDetails.lastName}
          >
            <div className="row">
              <div className="col-2">
                <b>{strings.MEMBER_EMAIL_ADDRESS + ": "}</b>
              </div>
              <div className="col-10">
                {memberDetails.emailAddress}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <b>{strings.MEMBER_PROJECT_ROLE + ": "}</b>
              </div>
              <div className="col-10">
                {memberDetails.roleName}
              </div>
            </div>

          </Callout>
        </div>
    )
  }
}

export default ContactTile
