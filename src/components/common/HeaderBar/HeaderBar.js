import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectSelector from '../ProjectSelector';
import UserMenu from '../UserMenu'

export class HeaderBar extends Component {
  static propTypes = {
    menuItems: PropTypes.array,
  }


  constructor(props) {
    super(props);

    const { auth } = this.props

    this.props.getAccessibleProjects(auth.info.idToken.jwtToken)
    this.state = {}
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
            projects !== undefined ? <ProjectSelector projects={projects.accessibleProjects} />  : null
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
