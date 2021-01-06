import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Spinner,
  Intent,
  Callout,
} from '@blueprintjs/core'

import * as Strings from '../../Data/Strings'

import UserAccreditations from '../Temp/UserAccreditations'
import UserAccreditationTile from '../UserAccreditationTile'

// TODO: Code this

export class UserDetailsPopOver extends Component {
  static propTypes = {
    projects: PropTypes.object.isRequired,
    memberDetails: PropTypes.object.isRequired,
    onCancelPopup: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      fetchError: false,
      updateError: false,
      chosenProjectId: "",
      errorText: "",
    }
  }

  componentDidMount() {
    console.log("successfully mounted component")

    this.setState({
      fetching: true,
      fetchError: false,
      updateError: false,
    })

    this.props.tempGetUserAccreditations(this.props.memberDetails.username, UserAccreditations, this.onGetAccreditationsSuccess, this.onGetAccreditationsFailed)
  }

  onGetAccreditationsSuccess = (result) => {
    console.log("success fetching accreditations")
    this.setState({
      fetching: false,
    })

  }

  onGetAccreditationsFailed = (result) => {
    console.error("failed to fetch accreditations")
    this.setState({
      fetching: false,
      fetchError: true,
    })
  }

  singleAccreditationPresentation = (accreditation, id) => {

    return (
      <UserAccreditationTile
        {...accreditation}
        key={id} />
    )
    /*
    const factomLink = `${process.env.REACT_APP_FACTOM_EXPLORER_SITE}/entries/${accreditation.proof.entryHash}`

    return (
      <div key={id} className='accreditation'>
        <p>{`${Strings.ACCREDITATION_NAME}: ${accreditation.accreditation.accreditationName}`}</p>
        <p>{`${Strings.ACCREDITATION_ISSUE_DATE}: ${accreditation.accreditation.issuedDate}`}</p>
        <p>{`${Strings.ACCREDITATION_ISSUER}: ${accreditation.accreditation.issuer}`}</p>
        <p><a target="_blank" rel="noopener noreferrer" href={factomLink}>{Strings.LINK_TO_PROOF}</a></p>
      </div>
    )
    */
  }

  // Get the code to display the user's details
  getUserDetailsPresentation = () => {

  }


  // Get the code to display the user's accreditations
  getAccreditationsPresentation = () => {

    const { accreditations } = this.props.members.currentMember

    const accreditationsPresentation = accreditations.map((accreditation, id)=> (
      this.singleAccreditationPresentation(accreditation, id)
    ))

    return <React.Fragment>{accreditationsPresentation}</React.Fragment>

  }


  // perform this if the user clicks close popup
  cancelPopup = () => {
    this.props.onCancelPopup()
  }



  detailsLoading = () => {
    return (
      <div className='fill'>
        <div className='loading-spinner'>
          <Spinner size={100} intent={Intent.DANGER} />
          <p>{Strings.USER_ACCREDITATIONS_LOADING}</p>
        </div>
      </div>
    )
  }


  render() {

    console.log(this.props.projects.chosenProject)
    //this.fetchUserDetails()

    return (
      <div id='popup-greyer' onClick={(e) => {
        e.stopPropagation()
        this.cancelPopup()
      }} >
        <div id='user-details-popover'>
          <div id='popup-box' onClick={(e) => e.stopPropagation()}>

            <div className='accreditation-list'>
              {
                this.state.fetching ? this.detailsLoading() : this.getAccreditationsPresentation()
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default UserDetailsPopOver
