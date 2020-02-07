import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectSelector from '../ProjectSelector';
import UserMenu from '../UserMenu'

import { Button } from '@blueprintjs/core'

export class HeaderBar extends Component {
  static propTypes = {
    menuItems: PropTypes.array,
  }


  constructor(props) {
    super(props);
    this.props.getAccessibleProjects(this.props.auth.info.idToken.jwtToken)
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

  getTestScreen = () => {
    this.props.history.push("/TestPage")
  }


  render() {

    return (
      <div id='header-bar' className='col-12'>
        <div className='header-content row'>
          {
            this.props.projects !== undefined ? <ProjectSelector projects={this.props.projects.accessibleProjects} />  : null
          }
          {
            process.env.REACT_APP_LOCAL_TESTING === "yes" ? <Button text="test page" onClick={(e) => this.getTestScreen()} /> : null
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
