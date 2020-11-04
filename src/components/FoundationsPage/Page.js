import React, { Component } from 'react'

import ReactGA from 'react-ga';

import HeaderBar from '../HeaderBar';
import SideBar from '../SideBar'
import Footer from '../common/footer'

import * as strings from '../../Data/Strings'

export class Page extends Component {


  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);
  }

  androidClicked = () => {
    console.log("androidClicked")
    window.open("https://play.google.com/store/apps/details?id=com.buildingim.foundations", "_blank")
  }

  iosClicked = () => {
    console.log("iosClicked")
    window.open("https://apps.apple.com/us/app/foundations/id1499177355", "_blank")
  }

  getPageContent = () => {
    return (
      <div className='foundations-page-container full-height'>


        <div className='foundations-icon row'>
          <div className="col-12">
            <img src={"images/Foundations-Logo.png"} alt="Foundations Logo" width="100%"/>
          </div>
        </div>

        <div className='foundations-icon-text row'>
          <div className="col-12">
            {strings.FOUNDATIONS_DESCRIPTION}
          </div>
        </div>

        <div className='foundations-download-icons row'>
          <div className="col-6">
            <img src={"images/Download_Android.svg"} alt="Android Logo" height="75" onClick={this.androidClicked}/>
          </div>
          <div className="col-6">
            <img src={"images/Download_iOS.svg"} alt="iOS Logo" height="75" onClick={this.iosClicked} />
          </div>
        </div>


        <div className='foundations-download-text row'>
          <div className="col-6">
            {/* Some text about the Google Play Icon */}
          </div>
          <div className="col-6">
            {/* Some text about the iOS icon */}
          </div>
        </div>


      </div>
    )
  }


  render() {

    return (
      <div id='foundations-page'>
        <div className="App-header">
          <HeaderBar />
        </div>
        {}

        <div className='content-with-sidebar full-height row'>
          <SideBar />
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
              this.getPageContent()
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
