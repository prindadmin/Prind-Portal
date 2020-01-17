import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

//import SideMenu from './side-menu'

export class HeaderBar extends Component {
  static propTypes = {
    companyName: PropTypes.string,
    menuItems: PropTypes.array,
  }

  constructor() {
    super();
    this.state = {
      width:  800,
      height: 600
    }
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let update_width  = window.innerWidth;
    let update_height = window.innerHeight;
    this.setState({ width: update_width, height: update_height });
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }


  getMenu = () => {
    //const menuItems = this.props.menuItems;

    if (this.state.width < 750) {
      return null
      //return <SideMenu />
      //TODO: Make the burger open a SideMenu
    }
    /*
    const links = menuItems.map(item => (
      <div className='menu-item' key={item.id}>
        <Link to={item.Target}>{item.Text}</Link>
      </div>
    ))
    */
    const links = null

    return (
      <div className='menu-container'>
        {links}
      </div>
    )
  }

  render() {

    const companyName = this.props.companyName;

    return (
      <div id='header-bar' className='col-12'>
        <div className='header-content row'>
          <div className='company-name col-5'>
            <Link to='/'>
              <h1>{companyName}</h1>
            </Link>
          </div>
          <div className='nav-links col-3 col-auto'>
            {this.getMenu()}
          </div>
        </div>
      </div>
    )
  }
}

export default HeaderBar
