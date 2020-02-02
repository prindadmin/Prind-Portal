import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import { FileUpload, DropDown, CalendarPicker } from '../common/ProjectDataFields'
import NoProjectSelected from '../common/NoProjectSelected'

import * as strings from '../../data/Strings'

const pageName = 'design'

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
      <div className='page-content'>
        <div className='page-title'>
          <h1>{strings.DESIGN_PAGE_TITLE}</h1>
          <span>{strings.DESIGN_PAGE_DESCRIPTION}</span>
        </div>
        {
          fields.map((singleField) => {

            if (singleField.type === 'file') {
              return <FileUpload
                        key={singleField.id}
                        elementContent={singleField}
                        pageName={pageName}
                        />
            }

            if (singleField.type === 'dropdown') {
              return <DropDown
                        key={singleField.id}
                        form={"field-" + singleField.id}
                        elementContent={singleField}
                        initialValues={singleField.fieldDetails}
                        pageName={pageName}
                        />
            }

            if (singleField.type === 'calendar') {
              return <CalendarPicker
                        key={singleField.id}
                        elementContent={singleField}
                        pageName={pageName}
                        />
            }

            return null

          })
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
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
              this.props.projects !== undefined ?
                this.props.projects.chosenProject.projectName === strings.NO_PROJECT_SELECTED ?
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
