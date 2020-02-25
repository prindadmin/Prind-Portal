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

  constructor(props) {
    super()

    const defaultAvatar = `images/default-avatar.png`

    this.state = {
      avatarLink: defaultAvatar
    }

    this.getImage(props)
  }

  getImage = (props) => {

    const { memberDetails } = props
    const that = this
    const avatarLink = `${process.env.REACT_APP_AWS_S3_USER_AVATAR_ENDPOINT}/${memberDetails.username}`

    var image = new Image();

    image.onload = function() {
        // image exists and is loaded
        that.setState({
          avatarLink: avatarLink
        })
        return
    }

    image.onerror = function() {
        // image did not load
        return
    }

    image.src = avatarLink
  }



  render() {

    const { memberDetails } = this.props
    const { avatarLink } = this.state

    return (
        <div id='contact-tile'>
          <div className='col-3'>
            <div className="text-center">
              <img src={avatarLink} className="avatar img-circle img-thumbnail" alt="avatar" />
            </div>
          </div>

          <div className='col-9'>
            <div className='row'>
              <h4 className='bp3-heading'>{memberDetails.firstName + " " + memberDetails.lastName}</h4>
            </div>

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

          </div>
        </div>
    )
  }
}

export default ContactTile
