import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import { FileUpload, DropDown, CalendarPicker, LongText } from '../common/ProjectDataFields'
import NoProjectSelected from '../common/NoProjectSelected'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../data/Strings'

const pageName = 'refurbishment'

export class Page extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  componentDidMount() {

    const { projects, auth, getContent, requestS3UploadToken, getProjectMembers } = this.props

    if (projects.chosenProject.projectName !== strings.NO_PROJECT_SELECTED) {
      requestS3UploadToken(auth.info.idToken.jwtToken, projects.chosenProject.id, pageName)
      getProjectMembers(auth.info.idToken.jwtToken, projects.chosenProject.id)
      getContent(auth.info.idToken.jwtToken, projects.chosenProject.id)
    }
  }

  componentDidUpdate(prevProps) {

    const { projects, auth, getContent, requestS3UploadToken, getProjectMembers } = this.props

    if (projects.chosenProject.id !== prevProps.projects.chosenProject.id) {
      requestS3UploadToken(auth.info.idToken.jwtToken, projects.chosenProject.id, pageName)
      getProjectMembers(auth.info.idToken.jwtToken, projects.chosenProject.id)
      getContent(auth.info.idToken.jwtToken, projects.chosenProject.id)
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



  render() {

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
              this.props.projects !== undefined ?
                this.props.projects.chosenProject.projectName === strings.NO_PROJECT_SELECTED ?
                this.showEmptyPage() :
                  this.props.pageContent.refurbishment.fetching ?
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
