import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import CreateCustomFieldPopover from "../common/CreateCustomFieldPopover"

export class Page extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  onClosePopup = () => {
    console.log("popup close request")
  }


  loadTestElement = () => {
    return(
      <div id="test-page">
        <div className="center-container">
          <CreateCustomFieldPopover
            projectID={"ProjectNumberFour"}
            pageName={"inception"}
            onClosePopover={this.onClosePopup}
          />
        </div>
      </div>
    )
  }



  render() {

    return (
      <div id='tender-page'>
        <div className="App-header">
          <HeaderBar />
        </div>

        <div className='content-with-sidebar full-height row'>

          <PageChooserSection />

          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {this.loadTestElement()}
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
