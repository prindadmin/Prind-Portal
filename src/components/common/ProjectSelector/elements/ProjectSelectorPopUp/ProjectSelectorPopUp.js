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

import * as strings from '../../../../../data/Strings'

export class ProjectSelectorPopUp extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    onCancelPopup: PropTypes.func.isRequired,
    updateChosenProject: PropTypes.func.isRequired,
    resetChosenProject: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      fetchError: false,
      updateError: false,
      errorText: "",
    }

    this.props.getAccessibleProjects(
      props.auth.info.idToken.jwtToken,
      this.resolveProjectFetch,
      this.rejectProjectFetch,
    )

  }


  // perform this if the user clicks close popup
  cancelPopup = () => {
    this.props.onCancelPopup()
  }

  siteChosen(project, event) {

    console.log(project)

    const { auth, updateChosenProject } = this.props

    updateChosenProject(
      auth.info.idToken.jwtToken,
      project,
      this.resolveProjectUpdate,
      this.rejectProjectUpdate,
    )
  }

  // TODO: Use these resolvers and rejectors
  resolveProjectFetch = () => {
    console.log("Resolved Project Fetch")
  }

  rejectProjectFetch = () => {
    console.log("Rejected Project Fetch")

    this.setState({
      fetchError: true,
      errorText: strings.ERROR_FETCHING_PROJECT_LIST,
    })
  }

  // TODO: Use these resolvers and rejectors
  resolveProjectUpdate = () => {
    console.log("Resolved Project Update")

    this.cancelPopup()
  }

  rejectProjectUpdate = () => {
    console.log("Rejected Project Update")

    this.setState({
      updateError: true,
      errorText: strings.ERROR_UNABLE_TO_SELECT_PROJECT,
    })
  }

  createNewProject = () => {

    const { resetChosenProject, history } = this.props

    resetChosenProject()
    history.push('/NewProject')
  }


  // TODO: Improve this
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

  siteSelectorPopupContent = () => {

    const { projects } = this.props
    const { fetchError, updateError, errorText } = this.state
    const { accessibleProjects } = this.props.projects
    const allProjects = accessibleProjects.projectOwner.concat(accessibleProjects.projectRole)

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
