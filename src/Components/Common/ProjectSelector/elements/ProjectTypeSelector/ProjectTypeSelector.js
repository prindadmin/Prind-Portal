import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'

import ItemIcon from '../../../../Common/ItemIcon'

import * as Strings from '../../../../../Data/Strings'
import * as Endpoints from '../../../../../Data/Endpoints'

const ProjectTypeTile = lazy(() => import('../../../../ProjectTypeTile'));

// TODO: give the user a choice of project type (complete or DHSF)
export class ProjectTypeSelector extends Component {
  static propTypes = {
    closePopup: PropTypes.func.isRequired,
  }

  // TODO: CONTINUE HERE

  createNewProject = ( projectType ) => {
    const { history } = this.props
    history.push(`/newproject?projectType=${projectType}`)
    this.props.closePopup()
  }

  render() {
    return (
      <p>hello, project type selector</p>
    )
  }

}

export default ProjectTypeSelector
