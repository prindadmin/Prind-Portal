import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import { FileUpload, DropDown, CalendarPicker, LongText } from '../common/ProjectDataFields'
import NoProjectSelected from '../common/NoProjectSelected'
import ErrorFetchingContent from '../common/ErrorFetchingContent'

import * as strings from '../../data/Strings'

const pageName = 'refurbishment'

export class Page extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  componentDidMount() {

    const { projects, auth, getContent, requestS3ProjectFileUploadToken, getProjectMembers } = this.props

    if (projects.chosenProject.projectName !== strings.NO_PROJECT_SELECTED) {
      requestS3ProjectFileUploadToken(auth.info.idToken.jwtToken, projects.chosenProject.projectId, pageName)
      getProjectMembers(auth.info.idToken.jwtToken, projects.chosenProject.projectId)
      getContent(auth.info.idToken.jwtToken, projects.chosenProject.projectId)
    }
  }

  componentDidUpdate(prevProps) {

    const { projects, auth, getContent, requestS3ProjectFileUploadToken, getProjectMembers } = this.props

    if (projects.chosenProject.projectId !== prevProps.projects.chosenProject.projectId) {
      requestS3ProjectFileUploadToken(auth.info.idToken.jwtToken, projects.chosenProject.projectId, pageName)
      getProjectMembers(auth.info.idToken.jwtToken, projects.chosenProject.projectId)
      getContent(auth.info.idToken.jwtToken, projects.chosenProject.projectId)
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

  showErrorPage = () => {
    return(
      <ErrorFetchingContent />
    )
  }

  showFilledPage = () => {

    const { fields }  = this.props.pageContent.refurbishment


    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{strings.REFURBISHMENT_PAGE_TITLE}</h1>
          <span>{strings.REFURBISHMENT_PAGE_DESCRIPTION}</span>
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

            if (singleField.type === 'longText') {
              return <LongText
                        key={singleField.id}
                        form={"field-" + singleField.id}
                        elementContent={singleField}
                        initialValues={singleField.fieldDetails}
                        pageName={pageName}
                        />
            }

            return null

          })
        }
      </div>
    )
  }

  chooseContent = () => {

    const { projects, pageContent } = this.props

    if (projects.chosenProject.projectName === strings.NO_PROJECT_SELECTED) {
      return this.showEmptyPage()
    }

    if (pageContent[pageName].fetching) {
      return this.showLoadingPage()
    }

    if (pageContent[pageName].error !== null) {
      return this.showErrorPage()
    }

    return this.showFilledPage()
  }



  render() {

    const { projects, pageContent } = this.props

    return (
      <div id='refurbishment-page'>
        <div className="App-header">
          <HeaderBar companyName='Prin-D' />
        </div>
        {}

        <div className='content-with-sidebar full-height row'>
          <PageChooserSection />
          <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
            {
              projects !== undefined ? this.chooseContent() : this.showErrorPage()
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
