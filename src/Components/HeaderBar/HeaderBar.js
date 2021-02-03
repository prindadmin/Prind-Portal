import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectSelector from '../Common/ProjectSelector';
import UserMenu from '../Common/UserMenu'
import NoFoundationsIDBanner from '../Common/NoFoundationsIDBanner'

export class HeaderBar extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string,
        projectType: PropTypes.string,
      })
    }),
    getUserDetails: PropTypes.func.isRequired,
    openProjectSelector: PropTypes.bool.isRequired,
  }

  componentDidMount() {

    const { getUserDetails } = this.props

    // When the header bar is loaded, fetch the user details
    getUserDetails(
      this.resolveUserDetails,
      this.rejectUserDetails,
    )
  }

  resolveUserDetails = () => {
    console.log("User Details fetched successfully")
  }

  rejectUserDetails = () => {
    console.log("User Details NOT fetched successfully")
  }

  getMenu = () => {

    return (
      <div className='menu-container'>
        <UserMenu />
      </div>
    )
  }


  render() {

    const { projects, openProjectSelector } = this.props

    return (
      <React.Fragment>
        <div id='header-bar' className='full-width row'>
          <div className='header-content row'>
            {
              projects !== undefined ? <ProjectSelector openProjectSelector={openProjectSelector}/> : null
            }
            <div className='nav-links'>
              {
                this.getMenu()
              }
            </div>
          </div>
        </div>
        {
          <NoFoundationsIDBanner />
        }
      </React.Fragment>
    )
  }
}

export default HeaderBar
