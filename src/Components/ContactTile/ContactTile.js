import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Callout,
  Intent,
} from '@blueprintjs/core'

import * as Strings from '../../Data/Strings'

const PopOverHandler = lazy(() => import('../Common/popOverHandler'));
const UserDetailsPopOver = lazy(() => import('../UserDetailsPopOver'));

export class ContactTile extends Component {
  static propTypes = {
    memberDetails: PropTypes.object.isRequired,
    onMemberRemove: PropTypes.func.isRequired,
    removeMember: PropTypes.func.isRequired,
    confirmed: PropTypes.bool.isRequired
  }

  constructor(props) {
    super()

    const defaultAvatar = `images/default-avatar.png`

    this.state = {
      removingMember: false,
      removeMemberError: false,
      showUserDetailsPopover: false,
      errorText: "",
      avatarLink: defaultAvatar,
      loadingImage: undefined,
    }
  }

  componentDidMount() {
    this.getImage()
  }

  componentWillUnmount() {
    // If the image is loaded, unload it (stop memory leak when image is still loading)
    if (this.state.loadingImage !== undefined) {
      const image = this.state.loadingImage
      image.src = ''
    }
  }

  getImage = () => {

    const { memberDetails } = this.props
    const that = this
    const avatarLink = `${process.env.REACT_APP_AWS_S3_USER_AVATAR_ENDPOINT}/${memberDetails.username}`

    var image = new Image();

    // Save the image object so it can be cancelled if component unloads during fetch
    this.setState({
      loadingImage: image
    })

    image.onload = function() {
        // image exists and is loaded
        that.setState({
          avatarLink: avatarLink
        })
        return
    }

    image.onerror = function() {
        // image did not load
        that.setState({
          avatarLink: "/images/default-avatar.png"
        })
        return
    }

    image.src = avatarLink
  }


  removeMemberResolve = () => {
    this.setState({
      removingMember: false,
    })

    this.props.onMemberRemove()
  }


  removeMemberReject = () => {
    this.setState({
      removingMember: false,
      removeMemberError: true,
      errorText: Strings.ERROR_REMOVING_MEMBER_FROM_PROJECT
    })
  }

  removeMember = (e) => {

    const { projects, removeMember, memberDetails } = this.props

    this.setState({
      removingMember: true,
      addMemberError: false,
    })

    removeMember(
      projects.chosenProject.projectId,
      memberDetails.username,
      this.removeMemberResolve,
      this.removeMemberReject,
    )
  }

  showUserDetails = () => {
    console.log("hello, user")
    this.setState({
      showUserDetailsPopover: true,
    })
  }

  hideUserDetails = () => {
    console.log("bye, user")
    this.setState({
      showUserDetailsPopover: false,
    })
  }

  render() {

    const { auth, projects, memberDetails, confirmed } = this.props
    const { avatarLink, removeMemberError, errorText, showUserDetailsPopover } = this.state

    // See if the current User is the client, and can therefore remove people
    const editableMemberList = projects.memberList.confirmed.filter(member => {
      return (
        member.username === auth.username &&
        (member.roleID === 'client' || member.roleID === 'clientTeamRepresentative' || member.roleID === 'creator') &&
        memberDetails.username !== member.username
      )
    })

    const userName = memberDetails.firstName !== null && memberDetails.lastName !== null ?
        memberDetails.firstName + " " + memberDetails.lastName :
        Strings.MEMBER_NOT_YET_SIGNED_UP_TO_PRIND

    const isConfirmed = confirmed ? "row member-confirmed" : "row member-not-confirmed"

    return (
        <div id='contact-tile' className={isConfirmed} onClick={(e) => {
          e.stopPropagation()
          this.showUserDetails()
        }}>
          <div className='col-md-3 col-sm-12'>
            <div className="text-center avatar-container">
              <img src={avatarLink} className="avatar img-circle img-thumbnail" alt="avatar" />
            </div>
          </div>

          <div className='col-md-9 col-sm-12'>
            <div className='row'>
              <h4 className='bp3-heading'>{userName}</h4>
            </div>

            <div className="row">
              <div className="col-lg-2 col-md-4">
                <b>{Strings.MEMBER_EMAIL_ADDRESS + ": "}</b>
              </div>
              <div className="col-lg-10 col-md-8">
                {memberDetails.emailAddress}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-2 col-md-4">
                <b>{Strings.MEMBER_PROJECT_ROLE + ": "}</b>
              </div>
              <div className="col-lg-10 col-md-8">
                {memberDetails.roleName}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-2 col-md-4">
                <b>{Strings.MEMBER_STATUS + ": "}</b>
              </div>
              <div className="col-lg-10 col-md-8">
                { confirmed ? Strings.MEMBER_IS_CONFIRMED : Strings.MEMBER_ISNT_YET_CONFIRMED }
              </div>
            </div>

            {
              removeMemberError ?
              <div className="row">
                <Callout style={{marginBottom: '15px'}} intent='danger'>
                  <div>{errorText}</div>
                </Callout>
              </div> :
              null
            }
            {
              editableMemberList.length > 0 ?
              <div className="row">
                <Button
                  text={Strings.BUTTON_REMOVE_MEMBER}
                  onClick={(e) => this.removeMember(e)}
                  intent={Intent.DANGER}
                />
              </div> : null
            }

            {
              showUserDetailsPopover ?
              <PopOverHandler>
                <UserDetailsPopOver
                  memberDetails={ memberDetails }
                  onCancelPopup={ this.hideUserDetails }
                />
              </PopOverHandler>
              :
              null
            }

          </div>
          <div className='view-accreditations'>
            { Strings.ACCREDITATION_VIEW_ACCREDITATIONS }
          </div>
        </div>
    )
  }
}

export default ContactTile
