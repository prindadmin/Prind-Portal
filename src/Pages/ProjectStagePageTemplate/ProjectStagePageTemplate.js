import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import ProjectLoading from '../../Components/Common/ProjectLoading'
import * as ComponentState from './States'

import CreateCustomFieldPopover from '../../Components/Common/CreateCustomFieldPopover'
import NoProjectSelected from '../../Components/Common/NoProjectSelected'
import ErrorFetchingContent from '../../Components/Common/ErrorFetchingContent'
import PageFieldMapper from '../../Components/PageFieldMapper'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as Strings from '../../Data/Strings'

export class StagePage extends Component {
  static propTypes = {
    pageName: PropTypes.string.isRequired,
    pageContent: PropTypes.object.isRequired,
  }

  constructor() {
    super()
    this.state = {
      state: ComponentState.QUIESCENT,
      createFieldIsOpen: false
    }
  }

  componentDidMount() {
    const { location, projects } = this.props
    const { projectId } = projects.chosenProject

    // Register pageview with GA
    ReactGA.pageview(location.pathname);

    if (projectId !== "") {
      this.fetchPageContent()
    }
  }

  componentDidUpdate(prevProps) {
    const { projectId } = this.props.projects.chosenProject
    if (projectId !== prevProps.projects.chosenProject.projectId) {
      this.fetchPageContent()
    }

    if (this.props.pageName !== prevProps.pageName) {
      this.fetchPageContent()
    }
  }

  fetchPageContent = () => {
    const { pageName } = this.props
    const { projectId } = this.props.projects.chosenProject

    this.setState({
      state: ComponentState.CONTENT_FETCH_IN_PROGRESS,
    })
    this.props.getContent(projectId, pageName, this.contentFetchSuccessful, this.contentFetchFailed)
  }

  contentFetchSuccessful = (result) => {
    this.setState({
      state: ComponentState.CONTENT_FETCH_SUCCESSFUL,
    })
  }

  contentFetchFailed = (error) => {
    this.setState({
      state: ComponentState.CONTENT_FETCH_FAILED,
      errorMessage: error.message,
    })
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
          text={Strings.CREATE_CUSTOM_FIELD}
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
    const { pageName, projects, pageContent } = this.props
    const { projectId } = projects.chosenProject
    const { fields }  = pageContent[pageName]

    const { title, description } = Strings.PAGE_TITLES_AND_DESCRIPTIONS[pageName]


    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
        {
          fields.map((singleField, index) => {
            return <PageFieldMapper
              key={index}
              pageName={pageName}
              projectId={projectId}
              singleField={singleField} />
          })
        }
        {this.getCreateFieldButton()}
      </div>
    )
  }

  chooseContent = () => {

    const { projects, pageContent, pageName } = this.props

    if (projects.chosenProject.projectName === Strings.NO_PROJECT_SELECTED) {
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

    const { projects, pageName } = this.props
    const { createFieldIsOpen } = this.state

    return (
      <div id='stage-page'>
        <div className='page-content-section'>
          {
            projects !== undefined  || this.state.state === ComponentState.CONTENT_FETCH_FAILED ? this.chooseContent() : this.showErrorPage()
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

export default StagePage
