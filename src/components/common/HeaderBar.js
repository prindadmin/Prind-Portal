import React, { Component } from 'react'
//import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

import ProjectSelector from './ProjectSelector';

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

    const links = null

    return (
      <div className='menu-container'>
        {links}
      </div>
    )
  }

  render() {

    //const companyName = this.state.companyName;

    const projects = [
      { id: 1234, name: "Project 1", siteDescription: "Project 1 Description.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      { id: 5678, name: "Project 2", siteDescription: "Project 2 Description" },
      { id: 2468, name: "Project 3", siteDescription: "Project 3 Description" },
      { id: 3333, name: "Project 4", siteDescription: "Project 4 Description" },
    ]

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
          <ProjectSelector projects={projects} />
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
