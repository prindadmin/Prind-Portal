import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  InputGroup,
  Button,
} from '@blueprintjs/core'

import PopOverHandler from '../popOverHandler'

import * as strings from '../../../data/Strings'

// TODO: Implement 'editable' prop.  i.e. make field locked when editable = false

export class Element extends Component {
  static propTypes = {
    teamMembers: PropTypes.arrayOf(
      PropTypes.shape({
        foundationsID: PropTypes.string.isRequired,
        emailAddress: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        roleID: PropTypes.number.isRequired,
        roleName: PropTypes.string.isRequired,
      })
    ).isRequired,
    fileDetails: PropTypes.shape({
      // TODO: Build this shape
    }).isRequired,
    onClosePopup: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      requestStatus: false,
      searchTerm: "",
      selectedMembers: [],
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    console.log(this.state)
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  // When the user wants to send the signing request, this is called
  sendSigningRequest = (e) => {
    console.log("sendSigningRequest clicked")
  }

  closePopup = () => {
    //this.props.onClosePopup()
    console.log("popup close called")
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    })

    e.stopPropagation()
  }

  onSubmit = (e) => {
    console.log("on submit clicked")
    e.stopPropagation()
  }

  tileClicked = (e, memberDetails) => {
    console.log(memberDetails)

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

    return(
      <div className={`member-tile${selectedMembers.includes(memberDetails) ? " selected" : ""}`} key={index} onClick={(e) => this.tileClicked(e, memberDetails)}>
        <p>{`${strings.MEMBER_NAME}: ${memberDetails.firstName} ${memberDetails.lastName}`}</p>
        <p>{`${strings.MEMBER_EMAIL_ADDRESS}: ${memberDetails.emailAddress}`}</p>
      </div>
    )
  }


  getTiles = () => {

    const { teamMembers } = this.props
    const { searchTerm } = this.state

    // item.lastName.toLowerCase().includes(searchTerm.toLowerCase())

    const filteredMembers = searchTerm !== "" ?
      teamMembers.filter((item) => {
        return (
          item.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          item.lastName.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      }) : teamMembers

    return(
      <div className="member-tile-container">
        <div className="row" noGutters={true}>
          {
            filteredMembers.map((memberDetails, index) => {
              return (
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
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


  getSubmitButton = () => {
    return(
      <div className="submit-button-container">
        <Button
          text={strings.BUTTON_SUBMIT}
          onClick={(e) => this.onSubmit(e)}
        />
      </div>
    )
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { requestError } = this.state

    const requestStatus = requestError ? "error" : ""

    return (
      <PopOverHandler>
        <div id='popup-greyer'>
          <div id='pick-signer-popover'>
            <div id='popup-box' className={requestStatus}>
              <div className='pick-signer-popover-container' onClick={(e) => {
                this.closePopup()
                e.stopPropagation()
                }}>
                <div className='element-title'>
                  {strings.PICK_DOCUMENT_SIGNER}
                </div>
                <div className='element-description'>
                  {this.getSearchBar()}
                  {this.getTiles()}
                  {this.getSubmitButton()}
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
