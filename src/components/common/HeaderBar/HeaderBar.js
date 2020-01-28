import React, { Component } from 'react'
//import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

import ProjectSelector from '../ProjectSelector';
import UserMenu from '../UserMenu'

const defaultName = "Prin-D"


export class HeaderBar extends Component {
  static propTypes = {
    companyName: PropTypes.string,
    menuItems: PropTypes.array,
  }


  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {

    this.props.getAccessibleProjects(this.props.auth.info.idToken.jwtToken)

    if (this.props.companyName === undefined) {
      this.setState({
        companyName: defaultName,
      })
    } else {
      this.setState({
        companyName: this.props.companyName,
      })
    }

  }

  getMenu = () => {

    return (
      <div className='menu-container'>
        <UserMenu />
      </div>
    )
  }

  render() {

    //const companyName = this.state.companyName;

    return (
      <div id='header-bar' className='col-12'>
        <div className='header-content row'>
          {/*
          <div className='company-name'>
            <Link to='/'>
              <h1>{companyName}</h1>
            </Link>
          </div>
          */}
          {
            this.props.projects !== undefined ? <ProjectSelector projects={this.props.projects.accessibleProjects} />  : null
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
