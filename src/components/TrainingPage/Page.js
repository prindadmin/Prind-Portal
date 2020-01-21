import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import ProviderDetails from './elements/provider-details'

import pageDetails from '../../data/pageDetails'

const pageName = "Training"

export class Page extends Component {
  static propTypes = {
    pageDetails: PropTypes.object,
  }


  render() {

    const { title, description, providers } = pageDetails[pageName]

    return (
      <div id='training-page'>
        <div className="App-header">
          <HeaderBar />
        </div>
        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            <div className='page-title'>
              <h1>{title}</h1>
              <span>{description}</span>
            </div>
            {
              providers != null ? providers.map((singleProvider) => {
                return (
                  <div className='form' key={singleProvider.name}>
                    <ProviderDetails details={singleProvider} />
                    <hr />
                  </div>
                )
              }) : null
            }
            </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
