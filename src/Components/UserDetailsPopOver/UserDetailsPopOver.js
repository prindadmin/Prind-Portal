import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

import {
  Spinner,
  Intent,
} from '@blueprintjs/core'

import * as Strings from '../../Data/Strings'

const UserAccreditationTile = lazy(() => import('../UserAccreditationTile'));
const NoAccreditationsAvailable = lazy(() => import('../Common/NoAccreditationsAvailable'));

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

    this.props.tempGetUserAccreditations(
      this.props.memberDetails.username,
      this.onGetAccreditationsSuccess,
      this.onGetAccreditationsFailed)
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
  }

  // Get the code to display the user's details
  getUserDetailsPresentation = () => {

  }


  // Get the code to display the user's accreditations
  getAccreditationsPresentation = () => {
    // TODO: Implement fetchError from state

    const { accreditations } = this.props.members.currentMember

    if (accreditations.length === 0) {
      return <NoAccreditationsAvailable />
    }

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

  onSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()

    this.cancelPopup()
  }

  render() {
    console.log(this.props.projects.chosenProject)

    return (
      <div id='popup-greyer' onClick={(e) => {
        e.stopPropagation()
        this.cancelPopup()
      }} >
        <div id='user-details-popover'>
          <div id='popup-box' onClick={(e) => e.stopPropagation()}>

            <div className='popup-box-header'>
              <h2>{ Strings.USER_ACCREDITATIONS_POPOVER_HEADING }</h2>
              <input
                type="submit"
                value={ Strings.CLOSE_WINDOW }
                className="close-button"
                onClick={(e) => this.onSubmit(e)} />
            </div>

            <div className='accreditation-list-container'>
              <div className='accreditation-list'>
                {
                  this.state.fetching ? this.detailsLoading() : this.getAccreditationsPresentation()
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserDetailsPopOver
