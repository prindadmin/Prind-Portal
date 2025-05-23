import React, { Component } from 'react'
import ReactGA from 'react-ga';

import * as Strings from '../../Data/Strings'

export class FoundationsPage extends Component {

  componentDidMount() {
    const { location } = this.props
    // Register pageview with GA
    ReactGA.pageview(location.pathname);
  }

  // androidClicked = () => {
  //   window.open(encodeURI("https://play.google.com/store/apps/details?id=com.buildingim.foundations"), "_blank")
  // }

  // iosClicked = () => {
  //   window.open(encodeURI("https://apps.apple.com/us/app/foundations/id1499177355#?platform=iphone"), "_blank")
  // }

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
            {Strings.FOUNDATIONS_DESCRIPTION}
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
        <div className='page-content-section row'>
          {
            this.getPageContent()
          }
        </div>
      </div>
    )
  }
}

export default FoundationsPage
