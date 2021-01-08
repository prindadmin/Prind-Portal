import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

import ProjectTile from '../project-tile'
import {
  Button,
  Spinner,
  Intent,
  Callout,
} from '@blueprintjs/core'

import ItemIcon from '../../../../Common/ItemIcon'

import * as Strings from '../../../../../Data/Strings'
import * as Endpoints from '../../../../../Data/Endpoints'

const ProjectTypeSelector = lazy(() => import('../ProjectTypeSelector'));

// TODO: when clicking new project button, give the user a choice of project type (complete or DHSF)
export class ProjectSelectorPopUp extends Component {
  static propTypes = {
    onCancelPopup: PropTypes.func.isRequired,
    updateChosenProject: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      fetchError: false,
      updateError: false,
      chosenProjectId: "",
      projectTypeSelectorOpen: false,
      errorText: "",
    }

    this.props.getAccessibleProjects(
      this.resolveProjectFetch,
      this.rejectProjectFetch,
    )

  }


  // perform this if the user clicks close popup
  cancelPopup = () => {
    this.props.onCancelPopup()
  }

  getCurrentPage = () => {
    const { pathname } = this.props.location

    // Remove final character slash if it is present
    const pathnameToCheck = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

    // Split and return the page name
    return pathnameToCheck.split("/")[1]
  }


  siteChosen = (project, event) => {
    console.log(project)
    const { updateChosenProject } = this.props

    this.setState({
      chosenProjectId: project.projectId
    })

    updateChosenProject(
      project,
      this.resolveProjectUpdate,
      this.rejectProjectUpdate,
    )
  }

  resolveProjectFetch = () => {
  }

  rejectProjectFetch = () => {
    this.setState({
      fetchError: true,
      errorText: Strings.ERROR_FETCHING_PROJECT_LIST,
    })
  }

  resolveProjectUpdate = () => {
    const { history } = this.props

    // If the current page is the new project page, go to the default page
    var currentPage = this.getCurrentPage()
    if (currentPage === 'newproject') {
      currentPage = Endpoints.DEFAULTLOGGEDINPAGE.replace("/", "")
    }

    const newPathname = `/${currentPage}/${this.state.chosenProjectId}`
    history.push(newPathname)

    this.cancelPopup()
  }

  rejectProjectUpdate = () => {
    this.setState({
      updateError: true,
      errorText: Strings.ERROR_UNABLE_TO_SELECT_PROJECT,
    })
  }

  createNewProject = () => {
    this.setState({
      projectTypeSelectorOpen: true,
    })
    /*
    // Load the new page project once type of project is picked
    const { history } = this.props
    history.push('/newproject')
    */
  }

  projectsLoading = () => {
    return (
      <div className='projects-loading-container fill'>
        <div className='loading-spinner'>
          <Spinner size={100} intent={Intent.DANGER} />
          <p>{Strings.PROJECTS_LOADING}</p>
        </div>
      </div>
    )
  }

  noProjectsAvailable = () => {
    return (
      <div className='projects-loading-container fill'>
        <div className='no-projects'>
          <ItemIcon size='6x' type='building' />
          <p>{Strings.NO_PROJECTS}</p>
        </div>
      </div>
    )
  }

  getSingleProjectPresentation = (project, id) => {
    return (
      <ProjectTile
        key={id}
        project={project}
        selected={false}
        onSelect={this.siteChosen} />
    )
  }

  getProjectListPresentation = ( projectList ) => {
    if (projectList.length === 0) {
      return this.noProjectsAvailable()
    }
    const projectsPresentation = projectList.map((project, id)=> (
      this.getSingleProjectPresentation(project, id)
    ))
    return <div className='project-list-container'>{projectsPresentation}</div>
  }


  concatProjects = () => {
    const { accessibleProjects } = this.props.projects
    let projectsWhereCreator = accessibleProjects.projectCreator.map(project => project.projectId);
    const roleNotCreator = accessibleProjects.projectRole.filter(item => !projectsWhereCreator.includes(item.projectId))
    var allProjects = accessibleProjects.projectCreator
    allProjects = allProjects.concat(roleNotCreator)
    return allProjects
  }


  getHeaderContent = () => {
    return (
      <div className='projects-pop-up-header'>
        <h2>Select a project</h2>
      </div>
    )
  }

  getFetchError = () => {
    // TODO: add refresh button
    const { errorText } = this.state
    return (
      <Callout style={{marginBottom: '15px'}} intent='danger'>
        <div>{errorText}</div>
      </Callout>
    )
  }

  getFooterContent = () => {
    // If the new project type selector is open, don't show the footer
    if (this.state.projectTypeSelectorOpen) {
      return null
    }

    return (
      <div className='projects-pop-up-footer'>
        <Button
          active={true}
          large={true}
          icon="cube-add"
          intent='success'
          onClick={(e) => this.createNewProject(e)}
          text={Strings.CREATE_NEW_PROJECT}
        />
      </div>
    )
  }

  siteSelectorPopupContent = () => {

    const { projects } = this.props
    const { fetchError, updateError, projectTypeSelectorOpen } = this.state
    const allProjects = this.concatProjects()

    return (
      <div id='popup-greyer' onClick={this.cancelPopup} >
        <div id='popup-box' onClick={(e) => e.stopPropagation()}>
          { this.getHeaderContent() }
          <div className='project-scroll-box'>
            {
              projects.fetching ? this.projectsLoading() :
              projectTypeSelectorOpen ? <ProjectTypeSelector closePopup={this.cancelPopup}/> :
              fetchError || updateError ? this.getFetchError() : this.getProjectListPresentation(allProjects)
            }
          </div>
          { this.getFooterContent() }
        </div>
      </div>
    )
  }

  render() {
    return this.siteSelectorPopupContent()
  }

}

export default ProjectSelectorPopUp
