import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReactGA from 'react-ga';

import ProjectLoading from '../../Components/common/ProjectLoading'

//import CreateCustomFieldPopover from '../../Components/common/CreateCustomFieldPopover'
import { FileUpload, DropDown, CalendarPicker, LongText } from '../../Components/common/ProjectDataFields'
import NoProjectSelected from '../../Components/common/NoProjectSelected'
import ErrorFetchingContent from '../../Components/common/ErrorFetchingContent'

import * as strings from '../../Data/Strings'

const pageName = 'refurbishment'

export class RefurbishmentPage extends Component {
  static propTypes = {
    pageContent: PropTypes.object,
  }

  componentDidMount() {
    const { projects, auth, getContent, location } = this.props
    const { projectId } = projects.chosenProject
    const { jwtToken } = auth.signInUserSession.idToken

    // Register pageview with GA
    ReactGA.pageview(location.pathname + location.search);

    if (projects.chosenProject.projectId !== "") {
      getContent(jwtToken, projectId)
    }
  }

  componentDidUpdate(prevProps) {
    const { projects, auth, getContent } = this.props
    const { projectId } = projects.chosenProject
    const { jwtToken } = auth.signInUserSession.idToken

    if (projectId !== prevProps.projects.chosenProject.projectId) {
      getContent(jwtToken, projectId)
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

    const { projects } = this.props

    return (
      <div id='refurbishment-page'>
        <div className='page-content-section col-xl-10 col-lg-9 col-md-9 col-sm-9'>
          {
            projects !== undefined ? this.chooseContent() : this.showErrorPage()
          }
        </div>
      </div>
    )
  }
}

export default RefurbishmentPage
