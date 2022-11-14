import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classes from './HeaderBar.module.css'

import ProjectSelector from '../Common/ProjectSelector';
import UserMenu from '../Common/UserMenu'

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
      <div className={classes.menuContainer}>
        <UserMenu />
      </div>
    )
  }

  getLogo = () => {
    return <img className={classes.logoImg} src="/images/logos/prind-tech-logo-white-text.svg" />
  }

  render() {
    const { openProjectSelector } = this.props
    return (
      <Fragment>
        <div id='header-bar' className={classes.headerBar}>
          <div className={classes.content}>
            {
              process.env.REACT_APP_IS_PROCORE !== "True" ? <ProjectSelector openProjectSelector={openProjectSelector} /> : this.getLogo()
            }
            <div className='nav-links'>
              {
                this.getMenu()
              }
            </div>
          </div>
        </div>
        {

        }
      </Fragment>
    )
  }
}

export default HeaderBar
