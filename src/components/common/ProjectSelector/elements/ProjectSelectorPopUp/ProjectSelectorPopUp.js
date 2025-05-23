import React, { Component } from 'react'
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
import * as ComponentState from '../../States'

//const ProjectTypeSelector = lazy(() => import('../ProjectTypeSelector'));

// TODO: FUTURE: Show invite projects here as well

export class ProjectSelectorPopUp extends Component {
  static propTypes = {
    projects: PropTypes.shape({
      accessibleProjects: PropTypes.shape({
        projectCreator: PropTypes.arrayOf(PropTypes.shape({
          data: PropTypes.string.isRequired,
          projectId: PropTypes.string.isRequired,
          projectName: PropTypes.string.isRequired,
          projectDescription: PropTypes.string,
          dateTime: PropTypes.string.isRequired,
          projectType: PropTypes.string.isRequired,
        })),
        projectRole: PropTypes.arrayOf(PropTypes.shape({
          projectId: PropTypes.string.isRequired,
          projectName: PropTypes.string.isRequired,
          projectDescription: PropTypes.string,
          dateTime: PropTypes.string.isRequired,
          projectType: PropTypes.string.isRequired,
        })),
      }),
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string.isRequired,
        projectType: PropTypes.string.isRequired,
      })
    }),
    onCancelPopup: PropTypes.func.isRequired,
    getAccessibleProjects: PropTypes.func.isRequired,
    updateChosenProject: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    resetChosenProject: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      state: ComponentState.QUIESCENT,
      chosenProjectId: "",
      errorText: "",
    }
  }

  componentDidMount() {
    this.fetchProjectList()
  }

  // perform this if the user clicks close popup
  cancelPopup = () => {
    console.log("closing popup")
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
      chosenProjectId: project.projectId,
      state: ComponentState.LOADING,
    })

    updateChosenProject(
      project,
      this.resolveProjectUpdate,
      this.rejectProjectUpdate,
    )
  }

  fetchProjectList = () => {
    this.setState({
      state: ComponentState.LOADING
    })

    this.props.getAccessibleProjects(
      this.resolveProjectFetch,
      this.rejectProjectFetch,
    )
  }

  resolveProjectFetch = () => {
    //console.log('successfully fetched project list')
    this.setState({
      state: ComponentState.QUIESCENT
    })
  }

  rejectProjectFetch = () => {
    //console.error('failed to fetch project list')
    this.setState({
      state: ComponentState.LOADING_ERROR,
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
      state: ComponentState.UPDATE_ERROR,
      errorText: Strings.ERROR_UNABLE_TO_SELECT_PROJECT,
    })
  }

  // This is the old function that allowed a choice of project type.  Keeping for later
  // Removed to allow separate DHSF and CDM2015 project portals
  /*
  createNewProject = () => {
    this.setState({
      state: ComponentState.PROJECT_TYPE_SELECTOR_OPEN,
    })
  }
  */

  // This is the new function that goes straight to the project details entry screen
  createNewProject = () => {
    this.props.resetChosenProject()
    this.props.history.push(`${Endpoints.NEWPROJECTPAGE}?project_type=${process.env.REACT_APP_PORTAL}`)
    this.cancelPopup()
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

  getProjectListPresentation = ( ) => {

    const allProjects = this.concatProjects()

    if (allProjects.length === 0) {
      return this.noProjectsAvailable()
    }
    const projectsPresentation = allProjects.map((project, id)=> (
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
    // Edit this so that it only shows projects for the specific portal
    allProjects = allProjects.filter(item => item.projectType === process.env.REACT_APP_PORTAL)
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
    const { errorText } = this.state
    return (
      <div className='error-box'>
        <Callout style={{marginBottom: '15px'}} intent='danger'>
          <div>{errorText}</div>
        </Callout>
        <input
          type="submit"
          value={ Strings.BUTTON_RETRY }
          className="close-button"
          onClick={(e) => this.fetchProjectList()} />
      </div>
    )
  }

  getFooterContent = () => {
    // If the new project type selector is open, don't show the footer
    if (this.state.state === ComponentState.PROJECT_TYPE_SELECTOR_OPEN) {
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
    //console.log(this.state.state)

    return (
      <div id='popup-greyer' onClick={this.cancelPopup} >
        <div id='popup-box' onClick={(e) => e.stopPropagation()}>
          { this.getHeaderContent() }
          <div className='project-scroll-box'>
            { /*
              // Removed to allow separate DHSF and CDM2015 project portals
              this.state.state === ComponentState.PROJECT_TYPE_SELECTOR_OPEN ? <ProjectTypeSelector closePopup={this.cancelPopup}/> : null
            */}
            {
              this.state.state === ComponentState.QUIESCENT ? this.getProjectListPresentation() : null
            }
            {
              this.state.state === ComponentState.LOADING ? this.projectsLoading() : null
            }
            {
              this.state.state === ComponentState.LOADING_ERROR ? this.getFetchError() : null
            }
            {
              this.state.state === ComponentState.UPDATE_ERROR ? this.getFetchError() : null
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
