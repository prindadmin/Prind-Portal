import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectTile from './elements/project-tile'
import { Button } from '@blueprintjs/core'

import * as strings from '../../../data/Strings'


export class ProjectSelectorPopUp extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    onCancelPopup: PropTypes.func.isRequired,
    onProjectChosen: PropTypes.func.isRequired,
    onCreateNewProject: PropTypes.func.isRequired,
  }

  // perform this if the user clicks close popup
  cancelPopup = () => {
    this.props.onCancelPopup()
  }

  siteChosen(project, event) {
    this.props.onProjectChosen(project)
  }

  createNewProject(e) {
    this.props.onCreateNewProject()
  }

  siteSelectorPopupContent = () => {

    const { projects } = this.props

    // filter the sites list into evens and odds so that they can be
    // displayed in 2 columns
    let evens = projects.filter((project, index) => {
      return index % 2 === 0;
    })

    let odds = projects.filter((project, index) => {
      return index % 2 === 1;
    })

    return (
      <div
        id='popup-greyer'
        onClick={this.cancelPopup}
      >
        <div id='popup-box'>
          <div className='projects-pop-up-header'>
            <h2>Select a project</h2>
          </div>
          <div className='project-scroll-box row'>
            <div className='column'>
              {
                evens.map(project => (
                  <Button
                    className={'full-width'}
                    key={project.id}
                    minimal={true}
                    onClick={(e) => this.siteChosen(project, e)}
                  >
                    <ProjectTile
                      project={project}
                      selected={false}
                    />
                  </Button>
                ))
              }
            </div>

            <div className='column'>
              {
                odds.map(project => (
                  <Button
                    className={'full-width'}
                    key={project.id}
                    minimal={true}
                    onClick={(e) => this.siteChosen(project, e)}
                  >
                    <ProjectTile
                      project={project}
                      selected={false}
                    />
                  </Button>
                ))
              }
            </div>
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
