import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

import * as Endpoints from '../../../../../Data/Endpoints'
import ProjectTypesList from '../../../../../Data/ProjectTypes'

const ProjectTypeTile = lazy(() => import('../../../../ProjectTypeTile'));

export class ProjectTypeSelector extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }

  createNewProject = ( projectType ) => {
    //console.log(`navigating to: ${Endpoints.NEWPROJECTPAGE}?project_type=${projectType}`)
    const { history } = this.props
    history.push(`${Endpoints.NEWPROJECTPAGE}?project_type=${projectType}`)
    //console.log("closing popup")
    this.props.closePopup()
  }

  getProjectTypesList = () => {
    const projectTypesPresentation = ProjectTypesList.map((projectType, id)=> (
      <ProjectTypeTile
        key={id}
        onSelect={this.createNewProject}
        {...projectType} />
    ))

    return <React.Fragment>{projectTypesPresentation}</React.Fragment>
  }


  render() {
    return (
      <div className='project-selector-container'>
        { this.getProjectTypesList() }
      </div>
    )
  }

}

export default ProjectTypeSelector
