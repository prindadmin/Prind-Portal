import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../../../../Common/ItemIcon'

import * as Strings from '../../../../../Data/Strings'
import * as Endpoints from '../../../../../Data/Endpoints'
import ProjectTypesList from '../../../../../Data/ProjectTypes'

const ProjectTypeTile = lazy(() => import('../../../../ProjectTypeTile'));

// TODO: give the user a choice of project type (complete or DHSF)
export class ProjectTypeSelector extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
  }

  createNewProject = ( projectType ) => {
    console.log(`navigating to: ${Endpoints.NEWPROJECTPAGE}?project_type=${projectType}`)

    const { history } = this.props
    history.push(`${Endpoints.NEWPROJECTPAGE}?project_type=${projectType}`)
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
