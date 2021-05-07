import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Data
import * as Endpoints from '../../Data/Endpoints'

// TODO: PROCORE: Add in button to create project
export class ProcoreProjectDoesNotExist extends Component {
  static propTypes = {}

  // Go straight to the project details entry screen
  createNewProject = () => {
    this.props.resetChosenProject()
    this.props.history.push(`${Endpoints.NEWPROJECTPAGE}?project_type=${process.env.REACT_APP_PORTAL}`)
  }

  render() {
    return "hello, project doesn't exist"
  }
}

export default ProcoreProjectDoesNotExist
