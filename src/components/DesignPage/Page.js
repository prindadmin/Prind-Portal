import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HeaderBar from '../common/HeaderBar';
import PageChooserSection from '../layouts/PageChooserSection'
import ProjectLoading from '../common/ProjectLoading'
import Footer from '../common/footer'

import CreateCustomFieldPopover from '../common/CreateCustomFieldPopover'
import { FileUpload, DropDown, CalendarPicker, LongText } from '../common/ProjectDataFields'
import NoProjectSelected from '../common/NoProjectSelected'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../data/Strings'

const pageName = 'design'

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

    const { projects, auth, getContent, requestS3UploadToken, getProjectMembers } = this.props

    if (projects.chosenProject.projectName !== strings.NO_PROJECT_SELECTED) {
      requestS3UploadToken(auth.info.idToken.jwtToken, projects.chosenProject.projectId, pageName)
      getProjectMembers(auth.info.idToken.jwtToken, projects.chosenProject.projectId)
      getContent(auth.info.idToken.jwtToken, projects.chosenProject.projectId)
    }
  }

  componentDidUpdate(prevProps) {

    const { projects, auth, getContent, requestS3UploadToken, getProjectMembers } = this.props

    if (projects.chosenProject.projectId !== prevProps.projects.chosenProject.projectId) {
      requestS3UploadToken(auth.info.idToken.jwtToken, projects.chosenProject.projectId, pageName)
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



  render() {

    const { projects } = this.props
    const { createFieldIsOpen } = this.state

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
