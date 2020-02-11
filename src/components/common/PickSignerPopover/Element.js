import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  InputGroup,
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
      searchTerm: ""
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
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
    //e.persist()
    //console.log(e)
    console.log(e.target.value)

    this.setState({
      searchTerm: e.target.value,
    })

    e.stopPropagation()
  }


  memberTileRenderer = (memberDetails, index) => {

    return(
      <div className="member-tile" key={index}>
        <div className="row">

          <div className="col">
            {memberDetails.firstName}
          </div>

          <div className="col">
            {memberDetails.lastName}
          </div>

          <div className="col">
            {memberDetails.emailAddress}
          </div>

        </div>
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
        {
          filteredMembers.map((memberDetails, index) => {
            return (
              this.memberTileRenderer(memberDetails, index)
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
          placeholder={strings.SEARCH}
          large
          onChange={this.onSearchChange}
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
