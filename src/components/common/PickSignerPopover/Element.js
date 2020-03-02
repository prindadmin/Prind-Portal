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

import * as strings from '../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    teamMembers: PropTypes.arrayOf(
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

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  // When the user wants to send the signing request, this is called
  sendSigningRequest = (e) => {
    e.stopPropagation()

    const { auth, projectID, pageName, fieldID } = this.props
    const { selectedMembers } = this.state

    var members = selectedMembers.map(value => value.username);

    this.props.requestSignature(
      auth.info.idToken.jwtToken,
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
      errorText: strings.ERROR_SENDING_SIGNATURE_REQUEST,
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
  tileClicked = (e, memberDetails) => {

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

    e.stopPropagation()
  }

  memberTileRenderer = (memberDetails, index) => {

    const { selectedMembers } = this.state

    const isSelected = selectedMembers.includes(memberDetails)

    return(
      <div className={`member-tile${isSelected ? " selected" : ""}`} key={index} onClick={(e) => this.tileClicked(e, memberDetails)}>
        <p>{`${strings.MEMBER_NAME}: ${memberDetails.firstName} ${memberDetails.lastName}`}</p>
        <p>{`${strings.MEMBER_EMAIL_ADDRESS}: ${memberDetails.emailAddress}`}</p>
        <div className="member-tile-tickbox">
          {isSelected ? <ItemIcon size='2x' type='ticked' /> : <ItemIcon size='2x' type='unticked' />}
        </div>
      </div>
    )
  }


  getTiles = () => {

    const { teamMembers } = this.props
    const { searchTerm } = this.state

    const filteredMembers = searchTerm !== "" ?
      teamMembers.filter((item) => {
        return (
          item.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      }) : teamMembers

    return(
      <div className="member-tile-container">
        <div className="row negative-margins">
          {
            filteredMembers.map((memberDetails, index) => {
              return (
                <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                  {this.memberTileRenderer(memberDetails, index)}
                </div>
              )
            })
          }
        </div>
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
          placeholder={strings.SEARCH}
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
          text={strings.BUTTON_SUBMIT}
          intent={Intent.PRIMARY}
          disabled={selectedMembers.length === 0}
          onClick={(e) => this.sendSigningRequest(e)}
        />
        <Button
          text={strings.BUTTON_CANCEL}
          onClick={(e) => {
            this.closePopover()
            e.stopPropagation()
          }}
        />
      </div>
    )
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

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
                  {strings.PICK_DOCUMENT_SIGNERS}
                </div>
                <div className='element-description'>
                  {
                    sendError ?
                    <Callout style={{marginBottom: '15px'}} intent='danger'>
                      <div>{errorText}</div>
                    </Callout> :
                    null
                  }
                  {this.getSearchBar()}
                  {this.getTiles()}
                  {this.getButtons()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopOverHandler>
    )
  }
}

export default Element
