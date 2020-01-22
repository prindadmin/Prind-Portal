import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import Footer from '../common/footer'

import SingleFieldRequirement from '../common/uploadfields/RequiredFileTile'
import NoProjectSelected from '../common/NoProjectSelected'

import * as strings from '../../data/Strings'
import pageDetails from '../../data/pageDetails'

const pageName = "Inception"

export class Page extends Component {
  static propTypes = {
    pageDetails: PropTypes.object,
  }


  showEmptyPage = () => {
    return(
      <NoProjectSelected />
    )
  }

  showFilledPage = () => {
    return(
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
    )
  }



  render() {

    return (
      <div id='inception-page'>
        <div className="App-header">
          <HeaderBar companyName='Prin-D' />
        </div>
        {}

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
              this.props.project.chosenProject.name === strings.NO_PROJECT_SELECTED ? this.showEmptyPage() : this.showFilledPage()
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
