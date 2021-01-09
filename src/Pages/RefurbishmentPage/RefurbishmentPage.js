import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import ProjectLoading from '../../Components/Common/ProjectLoading'

//import CreateCustomFieldPopover from '../../Components/Common/CreateCustomFieldPopover'
import NoProjectSelected from '../../Components/Common/NoProjectSelected'
import ErrorFetchingContent from '../../Components/Common/ErrorFetchingContent'
import PageFieldMapper from '../../Components/PageFieldMapper'

import * as Strings from '../../Data/Strings'

const pageName = 'refurbishment'

export class RefurbishmentPage extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  componentDidMount() {
    const { projects, getContent, location } = this.props
    const { projectId } = projects.chosenProject

    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);

    if (projects.chosenProject.projectId !== "") {
      getContent(projectId)
    }
  }

  componentDidUpdate(prevProps) {
    const { projects, getContent } = this.props
    const { projectId } = projects.chosenProject

    if (projectId !== prevProps.projects.chosenProject.projectId) {
      getContent(projectId)
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
          <h1>{Strings.REFURBISHMENT_PAGE_TITLE}</h1>
          <span>{Strings.REFURBISHMENT_PAGE_DESCRIPTION}</span>
        </div>
        {
          fields.map((singleField, index) => {
            return <PageFieldMapper
              key={index}
              pageName={pageName}
              singleField={singleField} />
          })
        }
      </div>
    )
  }

  chooseContent = () => {

    const { projects, pageContent } = this.props

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

    const { projects } = this.props

    return (
      <div id='refurbishment-page'>
        <div className='page-content-section row'>
          {
            projects !== undefined ? this.chooseContent() : this.showErrorPage()
          }
        </div>
      </div>
    )
  }
}

export default RefurbishmentPage
