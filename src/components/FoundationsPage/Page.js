import React, { Component } from 'react'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import * as strings from '../../data/Strings'

export class Page extends Component {

  androidClicked = () => {
    console.log("androidClicked")
    window.open("https://play.google.com/store/apps/details?id=com.buildingim.foundations", "_blank")
  }

  // TODO: Add in the iOS application once it is launched
  iosClicked = () => {
    console.log("iosClicked")
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
            <img src={"images/Download_iOS_soon.png"} alt="iOS Logo" height="75" onClick={this.iosClicked} />
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
          <PageChooserSection />
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
