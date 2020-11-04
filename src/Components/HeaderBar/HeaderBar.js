import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectSelector from '../common/ProjectSelector';
import UserMenu from '../common/UserMenu'
import NoFoundationsIDBanner from '../common/NoFoundationsIDBanner'

export class HeaderBar extends Component {
  static propTypes = {
    menuItems: PropTypes.array,
    getUserDetails: PropTypes.func.isRequired,
  }

  componentDidMount() {

    const { getUserDetails, auth } = this.props

    // When the header bar is loaded, fetch the user details
    getUserDetails(
      auth.info.idToken.jwtToken,
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

    const { projects, user } = this.props

    return (
      <React.Fragment>
        <div id='header-bar' className='full-width row'>
          <div className='header-content row'>
            {
              projects !== undefined ? <ProjectSelector />  : null
            }
            <div className='nav-links'>
              {
                this.getMenu()
              }
            </div>
          </div>
        </div>

        {
          user !== undefined ?
            user.details.foundationsID === null ?
            <div id="no-foundations-id-banner" className="row full-width">
              <NoFoundationsIDBanner />
            </div> :
            null :
          null
        }
      </React.Fragment>
    )
  }
}

export default HeaderBar
