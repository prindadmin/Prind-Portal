import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import CreateCustomFieldPopover from '../common/CreateCustomFieldPopover'
import { FileUpload, DropDown, CalendarPicker, LongText } from '../common/ProjectDataFields'
import NoProjectSelected from '../common/NoProjectSelected'
import ErrorFetchingContent from '../common/ErrorFetchingContent'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../Data/Strings'

const pageName = 'construction'

export class Page extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      createFieldIsOpen: false
    }
  }

  componentDidMount() {

    const { projects, auth, getContent, requestS3ProjectFileUploadToken, getProjectMembers, location } = this.props

    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);

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

  onClosePopup = () => {
    this.setState({
      createFieldIsOpen: false
    })
  }

  getCreateFieldButton = () => {
    return (
      <div className="create-custom-field-button-container">
        <Button
          text={strings.CREATE_CUSTOM_FIELD}
          intent={Intent.PRIMARY}
          onClick={(e) => this.setState({createFieldIsOpen: true})}
          />

      </div>
    )
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

    const { fields }  = this.props.pageContent.construction


    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{strings.CONSTRUCTION_PAGE_TITLE}</h1>
          <span>{strings.CONSTRUCTION_PAGE_DESCRIPTION}</span>
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
                        form={"field-" + singleField.id}
                        elementContent={singleField}
                        initialValues={singleField.fieldDetails}
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
        {this.getCreateFieldButton()}
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

    const { projects } = this.props
    const { createFieldIsOpen } = this.state

    return (
      <div id='construction-page'>
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
            {
              createFieldIsOpen ?
              <CreateCustomFieldPopover
                projectID={projects.chosenProject.projectId}
                pageName={pageName}
                onClosePopover={this.onClosePopup}
                />
              : null
            }
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Page
