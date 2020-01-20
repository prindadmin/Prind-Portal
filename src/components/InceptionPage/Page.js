import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import SingleFieldRequirement from '../common/uploadfields/RequiredFileTile'

import pageDetails from '../../data/pageDetails'

const pageName = "Inception"

export class Page extends Component {
  static propTypes = {
    pageDetails: PropTypes.object,
  }


  startProject = (e) => {
    console.log("should go to inception page")
    this.props.history.push('/#/Inception')
  }

  render() {

    return (
      <div id='inception-page'>
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
              pageDetails[pageName].questions != null ? pageDetails[pageName].questions.map((singleQuestion) => {
                return <SingleFieldRequirement key={singleQuestion.id} details={singleQuestion} />
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
