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

// TODO: Page updating doesn't show the loading spinner when refreshing from Git Text
// TODO: Wait on this page until the project S3 token is available

export class StagePage extends Component {
  static propTypes = {
    pageName: PropTypes.string.isRequired,
    projectId: PropTypes.string,
    getContent: PropTypes.func.isRequired,
    requestS3ProjectFileUploadToken: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      state: ComponentState.QUIESCENT,
      createFieldIsOpen: false
    }
  }

  componentDidMount() {
    const { location, projectId, pageName } = this.props

    // Register pageview with GA
    ReactGA.pageview(location.pathname);

    if (projectId !== "") {
      this.fetchPageContent()
      this.props.requestS3ProjectFileUploadToken(projectId, pageName)
    }
  }

  componentDidUpdate(prevProps) {
    const { projectId, pageName } = this.props

    if (projectId !== prevProps.projectId) {
      this.fetchPageContent()
      this.props.requestS3ProjectFileUploadToken(projectId, pageName)
    }

    if (pageName !== prevProps.pageName) {
      this.fetchPageContent()
      this.props.requestS3ProjectFileUploadToken(projectId, pageName)
    }
  }

  fetchPageContent = () => {
    const { pageName, projectId } = this.props

    if(projectId === undefined) {
      this.setState({
        state: ComponentState.CONTENT_NO_PROJECT_SELECTED,
      })
      return;
    }

    this.setState({
      state: ComponentState.CONTENT_FETCH_IN_PROGRESS,
    })

    console.log(this.props)
    this.props.getContent(projectId, pageName, this.contentFetchSuccessful, this.contentFetchFailed)
  }

  contentFetchSuccessful = (result) => {
    console.log('success fetching page content')
    console.log(result)
    this.setState({
      state: ComponentState.CONTENT_FETCH_SUCCESSFUL,
    })
  }

  contentFetchFailed = (error) => {
    console.log('error fetching page content')
    this.setState({
      state: ComponentState.CONTENT_FETCH_FAILED,
      errorMessage: error.Error.ErrorMessage,
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

    // Removed to allow separate DHSF and CDM2015 project portals
    /*
    var textObject = `PAGE_TITLES_AND_DESCRIPTIONS_CDM2015Project`
    try {
      if (projectType !== undefined) {
        textObject = `PAGE_TITLES_AND_DESCRIPTIONS_${projectType}`
      }
    }
    catch(e) {
      textObject = `PAGE_TITLES_AND_DESCRIPTIONS_CDM2015Project`
    }
    */

    const textObject = `PAGE_TITLES_AND_DESCRIPTIONS_${process.env.REACT_APP_PORTAL}`

    const { title, description } = Strings[textObject][pageName]

    return(
      <div className='page-content'>
        <div className='page-title'>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
        {
          fields !== undefined ?
          fields.map((singleField, index) => {
            return <PageFieldMapper
              key={index}
              pageName={pageName}
              projectId={projectId}
              singleField={singleField} />
          }):
          null
        }
        {this.getCreateFieldButton()}
      </div>
    )
  }


  render() {
    const { pageName, projects } = this.props
    const { projectId } = projects.chosenProject
    console.log(this.state.state)
    return (
      <div id='stage-page'>
        <div className='page-content-section'>
          {
            this.state.state === ComponentState.QUIESCENT ? this.showEmptyPage() : null
          }
          {
            this.state.state === ComponentState.CONTENT_FETCH_IN_PROGRESS ? this.showLoadingPage() : null
          }
          {
            this.state.state === ComponentState.CONTENT_FETCH_SUCCESSFUL ? this.showFilledPage() : null
          }
          {
            this.state.state === ComponentState.CONTENT_FETCH_FAILED ? this.showErrorPage() : null
          }
          {
            this.state.state === ComponentState.CONTENT_NO_PROJECT_SELECTED ? this.showEmptyPage() : null
          }
          {
            this.state.createFieldIsOpen ?
            <CreateCustomFieldPopover
              projectId={projectId}
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
