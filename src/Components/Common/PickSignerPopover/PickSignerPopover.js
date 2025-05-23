import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { InputGroup, Button, Intent, Callout } from '@blueprintjs/core'

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
    projectId: PropTypes.string.isRequired,
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
    e.preventDefault()
    const { projectId, pageName, fieldID } = this.props
    const { selectedMembers } = this.state
    var members = selectedMembers.map(value => value.username);
    this.props.requestSignature(
      projectId,
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
      return Strings.MEMBERS_NEEDS_FOUNDATIONS_TO_SIGN
    }
    return `${memberDetails.firstName} ${memberDetails.lastName}`
  }


  memberTileRenderer = (memberDetails, index) => {
    const { selectedMembers } = this.state
    const isSelected = selectedMembers.includes(memberDetails)
    const canSign = false

    var className = "member-tile"
    if(!canSign) {
      className += " cannot-sign"
    } else if(isSelected) {
      className += " selected"
    }

    return(
      <div id='contact-tile' className={className} key={index} onClick={(e) => this.tileClicked(e, memberDetails, canSign)}>
        <h4>{`${Strings.MEMBERS_NAME}:`}</h4>
        <p>{this.getName(memberDetails)}</p>
        <h4>{`${Strings.MEMBERS_EMAIL_ADDRESS}:`}</h4>
        <p>{`${memberDetails.emailAddress}`}</p>
        <div className="member-tile-tickbox">
          {isSelected ? <ItemIcon size='2x' type='ticked' /> : <ItemIcon size='2x' type='unticked' />}
        </div>
      </div>
    )
  }


  filterListBySearchTerm = (firstName, lastName, emailAddress, searchTerm) => {
    var returnBool = false
    if (firstName !== null) {
      returnBool = returnBool || firstName.toLowerCase().startsWith(searchTerm.toLowerCase())
    }
    if (lastName !== null) {
      returnBool = returnBool || lastName.toLowerCase().startsWith(searchTerm.toLowerCase())
    }
    if (emailAddress !== null) {
      returnBool = returnBool || emailAddress.toLowerCase().startsWith(searchTerm.toLowerCase())
    }
    return returnBool
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
      return this.filterListBySearchTerm(item.firstName, item.lastName, item.emailAddress, searchTerm)
    })
  }


  getTiles = () => {
    const filteredMembers = this.getFilteredMembers()
    return (
      <div className='user-tile-container'>
        {
          filteredMembers.map((memberDetails, index) => {
            return (
              <div key={index}>
                {this.memberTileRenderer(memberDetails, index)}
              </div>
            )
          })
        }
      </div>
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

  getSendError = () => {
    const { errorText } = this.state
    return(
      <Callout style={{marginBottom: '15px'}} intent='danger'>
        <div>{errorText}</div>
      </Callout>
    )
  }

  render() {
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
                  this.state.sendError ? this.getSendError() : null
                }
                {
                  this.getSearchBar()
                }
                {
                  this.getTiles()
                }
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
