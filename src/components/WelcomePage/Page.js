import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@blueprintjs/core'

import HeaderBar from '../../components/common/HeaderBar';
import PageChooserSection from '../../components/layouts/PageChooserSection'
import Footer from '../../components/common/footer'

import pageDetails from '../../data/pageDetails'

const pageName = "Welcome"

export class Page extends Component {
  static propTypes = {
    pageDetails: PropTypes.object,
  }


  startProject = (e) => {
    console.log("should go to inception page")
    this.props.history.push('/Inception')
  }

  render() {

    return (
      <div id='welcome-page'>
        <div className="App-header">
          <HeaderBar companyName='Prin-D' />
        </div>
        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            <div className='page-title'>
              <h1>{pageDetails[pageName].title}</h1>
              <span>{pageDetails[pageName].description}</span>
            </div>
            {
              <Button
                className='submit-button bp3-intent-primary'
                ref='submitButton'
                onClick={(e) => this.startProject(e)}
                text='Start a Project'
              />
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
