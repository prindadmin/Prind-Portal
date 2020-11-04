import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import ProjectLoading from '../../Components/common/ProjectLoading'

import CreateCustomFieldPopover from '../../Components/common/CreateCustomFieldPopover'
import { FileUpload, DropDown, CalendarPicker, LongText } from '../../Components/common/ProjectDataFields'
import NoProjectSelected from '../../Components/common/NoProjectSelected'
import ErrorFetchingContent from '../../Components/common/ErrorFetchingContent'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../Data/Strings'

const pageName = 'inception'

export class InceptionPage extends Component {
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
    const { projects, auth, getContent, location } = this.props
    const { projectId } = projects.chosenProject
    const { jwtToken } = auth.info.idToken

    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);

    if (projects.chosenProject.projectId !== "") {
      getContent(jwtToken, projectId)
    }
  }

  componentDidUpdate(prevProps) {
    const { projects, auth, getContent } = this.props
    const { projectId } = projects.chosenProject
    const { jwtToken } = auth.info.idToken

    if (projectId !== prevProps.projects.chosenProject.projectId) {
      getContent(jwtToken, projectId)
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

    const { fields }  = this.props.pageContent.inception

    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{strings.INCEPTION_PAGE_TITLE}</h1>
          <span>{strings.INCEPTION_PAGE_DESCRIPTION}</span>
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
      <div id='inception-page'>
        <div className='page-content-section row'>
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
      </div>
    )
  }
}

export default InceptionPage
