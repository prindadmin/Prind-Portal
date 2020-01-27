import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import SingleFieldRequirement from '../common/uploadfields/RequiredFileTile'
import NoProjectSelected from '../common/NoProjectSelected'

import * as strings from '../../data/Strings'

export class Page extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  componentDidMount() {
    this.props.getContent(this.props.auth.info.idToken.jwtToken, this.props.projects.chosenProject.id)
  }

  componentDidUpdate(prevProps) {

    if (this.props.projects.chosenProject.id !== prevProps.projects.chosenProject.id) {
      this.props.getContent(this.props.auth.info.idToken.jwtToken, this.props.projects.chosenProject.id)
    }

  }

  showEmptyPage = () => {
    return(
      <NoProjectSelected />
    )
  }

  showLoadingPage = () => {
    return (
      <ProjectLoading />
    )
  }

  showFilledPage = () => {

    const { fields }  = this.props.pageContent.design


    return(
      <div className='page-content col-xl-10 col-lg-9 col-md-9 col-sm-9'>
        <div className='page-title'>
          <h1>{strings.DESIGN_PAGE_TITLE}</h1>
          <span>{strings.DESIGN_PAGE_DESCRIPTION}</span>
        </div>
        {
          fields != null ? fields.map((singleField) => {
            return <SingleFieldRequirement key={singleField.id} details={singleField} />
          }) : null
        }
      </div>
    )
  }



  render() {

    return (
      <div id='design-page'>
        <div className="App-header">
          <HeaderBar companyName='Prin-D' />
        </div>
        {}

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
              this.props.projects !== undefined ?
                this.props.projects.chosenProject.name === strings.NO_PROJECT_SELECTED ?
                this.showEmptyPage() :
                  this.props.pageContent.design.fetching ?
                  this.showLoadingPage() :
                  this.showFilledPage() :
              null
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
