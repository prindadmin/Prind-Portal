import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import classes from './ProcoreProjectDoesNotExist.module.css'

// Data
import * as Endpoints from '../../Data/Endpoints'
import * as Strings from '../../Data/Strings'

// Components
import FullScreenTile from '../FullScreenTile'

export class ProcoreProjectDoesNotExist extends Component {
  static propTypes = {}

  // Go straight to the project details entry screen
  createNewProject = () => {
    this.props.resetChosenProject()
    this.props.history.push(`${Endpoints.NEWPROJECTPAGE}?project_type=${process.env.REACT_APP_PORTAL}`)
  }

  getCreateButton = () => {
    return (
      <input
        type='submit'
        className={classes.createButton}
        value={Strings.BUTTON_PROCORE_PROJECT_CREATE}
        onClick={this.createNewProject} />
    )
  }

  render() {
    return (
      <FullScreenTile>
        { Strings.PROCORE_PROJECT_DOES_NOT_EXIST_IN_PRIND }
        { this.getCreateButton() }
      </FullScreenTile>
    )
  }
}

export default ProcoreProjectDoesNotExist
