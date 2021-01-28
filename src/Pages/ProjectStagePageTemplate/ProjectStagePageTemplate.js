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

export class StagePage extends Component {
  static propTypes = {
    pageName: PropTypes.string.isRequired,
    projectId: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      state: ComponentState.QUIESCENT,
      createFieldIsOpen: false
    }
  }

  componentDidMount() {
    const { location, projectId } = this.props

    // Register pageview with GA
    ReactGA.pageview(location.pathname);

    if (projectId !== "") {
      this.fetchPageContent()
    }
  }

  componentDidUpdate(prevProps) {
    const { projectId } = this.props

    if (projectId !== prevProps.projectId) {
      this.fetchPageContent()
    }

    if (this.props.pageName !== prevProps.pageName) {
      this.fetchPageContent()
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
    const { projectId, projectType } = projects.chosenProject
    const { fields }  = pageContent[pageName]

    var textObject = `PAGE_TITLES_AND_DESCRIPTIONS_CDM2015Project`
    try {
      if (projectType !== undefined) {
        textObject = `PAGE_TITLES_AND_DESCRIPTIONS_${projectType}`
      }
    }
    catch(e) {
      textObject = `PAGE_TITLES_AND_DESCRIPTIONS_CDM2015Project`
    }

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
    const { pageName, projectId } = this.props
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
              projectID={projectId}
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
