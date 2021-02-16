import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  InputGroup,
  Button,
  Intent,
  Callout,
} from '@blueprintjs/core'

import ItemIcon from '../ItemIcon'

import PopOverHandler from '../popOverHandler'

import * as Strings from '../../../Data/Strings'

export class PickSignerPopover extends Component {
  static propTypes = {
    teamMembers: PropTypes.shape({
      confirmed: PropTypes.arrayOf(
        PropTypes.shape({
          username: PropTypes.string.isRequired,
          foundationsID: PropTypes.string,
          emailAddress: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          roleID: PropTypes.string.isRequired,
          roleName: PropTypes.string.isRequired,
        })
      ).isRequired,
      invited: PropTypes.arrayOf(
        PropTypes.shape({
          username: PropTypes.string,
          foundationsID: PropTypes.string,
          emailAddress: PropTypes.string.isRequired,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          roleID: PropTypes.string.isRequired,
          roleName: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    fileDetails: PropTypes.shape({
      uploadedDateTime: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      proofLink: PropTypes.string,
      uploadedBy: PropTypes.string.isRequired,
      ver: PropTypes.string.isRequired,
      signatures: PropTypes.array.isRequired,
      s3VersionId: PropTypes.string.isRequired,
      uploadName: PropTypes.string.isRequired,
    }).isRequired,
    projectID: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldID: PropTypes.string.isRequired,
    onClosePopover: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      searchTerm: "",
      selectedMembers: [],
      sendError: false,
      errorText: ""
    }
  }


  // When the user wants to send the signing request, this is called
  sendSigningRequest = (e) => {
    e.stopPropagation()
    const { projectID, pageName, fieldID } = this.props
    const { selectedMembers } = this.state
    var members = selectedMembers.map(value => value.username);
    this.props.requestSignature(
      projectID,
      pageName,
      fieldID,
      members,
      this.sendResolve,
      this.sendReject,
    )
  }

  sendResolve = () => {
    this.closePopover()
  }

  sendReject = () => {
    this.setState({
      sendError: true,
      errorText: Strings.ERROR_SENDING_SIGNATURE_REQUEST,
    })
  }

  // Trigger the closing of the popover
  closePopover = () => {
    this.props.onClosePopover()
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    })
    e.stopPropagation()
  }

  // When a tile it clicked, add or remove it from the selected members list
  tileClicked = (e, memberDetails, canSign) => {
    e.stopPropagation()
    if (!canSign) {
      return;
    }

    var { selectedMembers } = this.state

    // If the member is already selected, remove it, or add the member if they have not been chosen
    if (selectedMembers.includes(memberDetails)) {
      selectedMembers = selectedMembers.filter(item => item !== memberDetails)
    } else {
      selectedMembers.push(memberDetails)
    }

    this.setState({
      selectedMembers: selectedMembers
    })
  }

  getName = (memberDetails) => {
    if (memberDetails.firstName === null || memberDetails.lastName === null) {
      return Strings.MEMBER_NEEDS_FOUNDATIONS_TO_SIGN
    }
    return `${memberDetails.firstName} ${memberDetails.lastName}`
  }

  memberTileRenderer = (memberDetails, index) => {
    const { selectedMembers } = this.state
    const isSelected = selectedMembers.includes(memberDetails)
    const canSign = memberDetails.foundationsID !== null

    var className = "member-tile"
    if(!canSign) {
      className += " cannot-sign"
    } else if(isSelected) {
      className += " selected"
    }

    return(
      <div id='contact-tile' className={className} key={index} onClick={(e) => this.tileClicked(e, memberDetails, canSign)}>
        <h4>{`${Strings.MEMBER_NAME}:`}</h4>
        <p>{this.getName(memberDetails)}</p>
        <h4>{`${Strings.MEMBER_EMAIL_ADDRESS}:`}</h4>
        <p>{`${memberDetails.emailAddress}`}</p>
        <div className="member-tile-tickbox">
          {isSelected ? <ItemIcon size='2x' type='ticked' /> : <ItemIcon size='2x' type='unticked' />}
        </div>
      </div>
    )
  }

  getFilteredMembers = () => {
    const { teamMembers } = this.props
    const { searchTerm } = this.state
    const filteredInvitees = teamMembers.invited.filter((item) => {
      return (
        item.username !== null
      )
    })
    // If the search term is blank, return all users
    if (searchTerm === "") {
      return teamMembers.confirmed.concat(filteredInvitees)
    }
    // If not blank, filter the members
    return (teamMembers.confirmed.concat(filteredInvitees)).filter((item) => {
      return (
        (item.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        item.lastName.toLowerCase().startsWith(searchTerm.toLowerCase()))
      )
    })
  }


  getTiles = () => {
    const filteredMembers = this.getFilteredMembers()
    return (
      <React.Fragment>
        {
          filteredMembers.map((memberDetails, index) => {
            return (
              <div key={index}>
                {this.memberTileRenderer(memberDetails, index)}
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }


  getSearchBar = () => {
    return(
      <div className="search-bar-container">
        <InputGroup
          className='search-field'
          id='search-field'
          type='search'
          placeholder={Strings.SEARCH}
          large
          onChange={this.onSearchChange}
        />
      </div>
    )
  }


  getButtons = () => {
    const { selectedMembers } = this.state
    return(
      <div className="buttons-container">
        <Button
          text={Strings.BUTTON_SUBMIT}
          intent={Intent.PRIMARY}
          disabled={selectedMembers.length === 0}
          onClick={(e) => this.sendSigningRequest(e)}
        />
        <Button
          text={Strings.BUTTON_CANCEL}
          onClick={(e) => {
            this.closePopover()
            e.stopPropagation()
          }}
        />
      </div>
    )
  }


  render() {
    const { sendError, errorText } = this.state
    return (
      <PopOverHandler>
        <div id='popup-greyer' onClick={(e) => {
          this.closePopover()
          e.stopPropagation()
          }}>
          <div id='pick-signer-popover'>
            <div id='popup-box' onClick={(e) => e.stopPropagation()}>
              <div className='pick-signer-popover-container'>
                <div className='element-title'>
                  {Strings.PICK_DOCUMENT_SIGNERS}
                </div>
                {
                  sendError ?
                  <Callout style={{marginBottom: '15px'}} intent='danger'>
                    <div>{errorText}</div>
                  </Callout> :
                  null
                }
                {
                  this.getSearchBar()
                }
                <div className='user-tile-container'>
                  {
                    this.getTiles()
                  }
                </div>
                {
                  this.getButtons()
                }
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }
}

export default PickSignerPopover
