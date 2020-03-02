import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectSelector from '../ProjectSelector';
import UserMenu from '../UserMenu'

export class HeaderBar extends Component {
  static propTypes = {
    menuItems: PropTypes.array,
  }

  componentDidMount() {
  }

  getMenu = () => {

    return (
      <div className='menu-container'>
        <UserMenu />
      </div>
    )
  }


  render() {

    const { projects } = this.props

    return (
      <div id='header-bar' className='col-12'>
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
    )
  }
}

export default HeaderBar
