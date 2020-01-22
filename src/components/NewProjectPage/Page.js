import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import * as strings from '../../data/Strings'
import pageDetails from '../../data/pageDetails'

const pageName = "Create a new project"

export class Page extends Component {
  static propTypes = {
    pageDetails: PropTypes.object,
  }


  notDoneYet = () => {
    return(
      <div className='no-project-selected-container fill'>
        <div className='no-project-selected'>
          Page content creation is not done yet
        </div>
      </div>
    )
  }

  render() {

    return (
      <div id='inception-page'>
        <div className="App-header">
          <HeaderBar />
        </div>
        {}

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {this.notDoneYet()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
