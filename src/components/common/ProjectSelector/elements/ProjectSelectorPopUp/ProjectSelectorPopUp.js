import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectTile from '../project-tile'
import {
  Button,
  Spinner,
  Intent,
  Callout,
} from '@blueprintjs/core'

import ItemIcon from '../../../../common/ItemIcon'

import * as strings from '../../../../../Data/Strings'

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



  siteChosen(project, event) {

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
      errorText: strings.ERROR_FETCHING_PROJECT_LIST,
    })
  }

  resolveProjectUpdate = () => {

    const { history } = this.props

    const newPathname = `/${this.getCurrentPage()}/${this.state.chosenProjectId}`
    history.push(newPathname)

    this.cancelPopup()
  }

  rejectProjectUpdate = () => {
    this.setState({
      updateError: true,
      errorText: strings.ERROR_UNABLE_TO_SELECT_PROJECT,
    })
  }

  createNewProject = () => {
    const { history } = this.props
    history.push('/newproject')
  }

  projectsLoading = () => {
    return (
      <div className='projects-loading-container fill'>
        <div className='loading-spinner'>
          <Spinner size={100} intent={Intent.DANGER} />
          <p>{strings.PROJECTS_LOADING}</p>
        </div>
      </div>
    )
  }

  noProjectsAvailable = () => {
    return (
      <div className='projects-loading-container fill'>
        <div className='no-projects'>
          <ItemIcon size='6x' type='building' />
          <p>{strings.NO_PROJECTS}</p>
        </div>
      </div>
    )
  }


  concatProjects = () => {

    const { accessibleProjects } = this.props.projects
    let projectsWhereCreator = accessibleProjects.projectCreator.map(project => project.projectId);
    const roleNotCreator = accessibleProjects.projectRole.filter(item => !projectsWhereCreator.includes(item.projectId))

    var allProjects = accessibleProjects.projectCreator
    allProjects = allProjects.concat(roleNotCreator)

    return allProjects
  }

  siteSelectorPopupContent = () => {

    const { projects } = this.props
    const { fetchError, updateError, errorText } = this.state
    const allProjects = this.concatProjects()

    return (
      <div
        id='popup-greyer'
        onClick={this.cancelPopup}
      >
        <div id='popup-box' onClick={(e) => e.stopPropagation()}>
          <div className='projects-pop-up-header'>
            <h2>Select a project</h2>
          </div>
          <div className='project-scroll-box'>
            {
              projects.fetching ? this.projectsLoading() :
                <React.Fragment>
                  {
                    fetchError || updateError ?
                      <Callout style={{marginBottom: '15px'}} intent='danger'>
                        <div>{errorText}</div>
                      </Callout> : null
                  }
                  {
                    allProjects.length !== 0 ?
                      <div className='row'>
                        {
                          allProjects.map((project, index) => (
                            <div key={index} className='col-md-12 col-lg-6 col-xl-4 flex-dir-row'>
                              <Button
                                className={'full-width'}
                                minimal={true}
                                onClick={(e) => this.siteChosen(project, e)}
                              >
                                <ProjectTile
                                  project={project}
                                  selected={false}
                                />
                              </Button>
                            </div>
                          ))
                        }
                      </div>
                    : this.noProjectsAvailable()
                  }
                </React.Fragment>
              }
          </div>
          <div className='projects-pop-up-footer'>
            <Button
              active={true}
              large={true}
              icon="cube-add"
              intent='success'
              onClick={(e) => this.createNewProject(e)}
              text={strings.CREATE_NEW_PROJECT}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.siteSelectorPopupContent()
  }

}

export default ProjectSelectorPopUp
