import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './ProjectStagePageWithStandards.module.css'

import ReactGA from 'react-ga';

import ProjectLoading from '../../Components/Common/ProjectLoading'
import * as ComponentState from './States'
import * as Endpoints from '../../Data/Endpoints'

import CreateCustomFieldPopover from '../../Components/Common/CreateCustomFieldPopover'
import NoProjectSelected from '../../Components/Common/NoProjectSelected'
import ErrorFetchingContent from '../../Components/Common/ErrorFetchingContent'
import StandardMapper from '../../Components/StandardMapper'

import {
  Button,
  Intent,
} from '@blueprintjs/core'

import * as Strings from '../../Data/Strings'

// TODO: FUTURE: Page updating doesn't show the loading spinner when refreshing from Git Text
// TODO: FUTURE: Wait on this page until the project S3 token is available

export class StagePage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    pageName: PropTypes.string.isRequired,
    projectId: PropTypes.string,
    currentPageContent: PropTypes.shape({
      standards: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          fields: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              type: PropTypes.oneOf(["file", "dropdown", "calendar", "longText"]),
              default: PropTypes.bool.isRequired,
              editable: PropTypes.bool.isRequired,
              fileDetails: PropTypes.arrayOf(
                PropTypes.shape({
                  uploadName: PropTypes.string.isRequired,
                  uploadedBy: PropTypes.string.isRequired,
                  ver: PropTypes.string.isRequired,
                  uploadedDateTime: PropTypes.number.isRequired,
                  proofLink: PropTypes.string,
                  signatures: PropTypes.arrayOf(
                    PropTypes.shape({
                      signerName: PropTypes.string.isRequired,
                      signatureDateTime: PropTypes.number.isRequired,
                      proofLink: PropTypes.string.isRequired,
                    })
                  )
                })
              )
            })
          ).isRequired
        }).isRequired
      ).isRequired
    }).isRequired,
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
    const { location, projectId } = this.props

    // Register pageview with GA
    ReactGA.pageview(location.pathname);

    if (projectId !== "") {
      this.fetchPageContent()
    }
  }

  componentDidUpdate(prevProps) {
    const { projectId, pageName } = this.props

    if (projectId !== prevProps.projectId) {
      this.fetchPageContent()
      return;
    }

    if (pageName !== prevProps.pageName) {
      this.fetchPageContent()
    }
  }

  fetchPageContent = () => {
    const { pageName, projectId } = this.props
    if(projectId === "" || !projectId) {
      this.setState({
        state: ComponentState.CONTENT_NO_PROJECT_SELECTED,
      })
      return;
    }
    this.setState({
      state: ComponentState.CONTENT_FETCH_IN_PROGRESS,
    })
    this.props.requestS3ProjectFileUploadToken(projectId, pageName)
    this.props.getContent(projectId, pageName, this.contentFetchSuccessful, this.contentFetchFailed)
  }


  contentFetchSuccessful = (result) => {
    //console.log('success fetching page content')
    //console.log(result)
    this.setState({
      state: ComponentState.CONTENT_FETCH_SUCCESSFUL,
    })
  }

  contentFetchFailed = (error) => {
    //console.log('error fetching page content')
    //console.log(error)
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
      <div className={classes.customFieldButtonHolder}>
        <Button
          id='create-field-button'
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
      <ProjectLoading text={Strings.STAGE_LOADING_PLEASE_WAIT}/>
    )
  }

  showErrorPage = () => {
    return(
      <ErrorFetchingContent />
    )
  }

  showFilledPage = () => {
    const { projectId, pageName, currentPageContent } = this.props
    const { standards }  = currentPageContent

    const textObject = `PAGE_TITLES_AND_DESCRIPTIONS_${process.env.REACT_APP_PORTAL}`
    const { title, description } = Strings[textObject][pageName]

    return(
      <div className={classes.contentContainer}>
        <div className='page-title'>
          <h1>{title}</h1>
          <span>{description}</span>
        </div>
        <div className={classes.standardsContainer}>
          {
            standards.map((standard, index) => {
              return <StandardMapper
                key={index}
                pageName={pageName}
                projectId={projectId}
                { ...standard } />
            })
          }
        </div>
        { this.props.location.pathname.startsWith(Endpoints.REFURBISHMENTPAGE) ? null : this.getCreateFieldButton() }
      </div>
    )
  }


  render() {
    const { projectId, pageName } = this.props
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
