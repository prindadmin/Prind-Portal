import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../Reducers/userReducer'
import * as projects from '../../Reducers/projects'

import PageComponent from './LoggedInContent'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectDetails: (project, resolve) => {
      dispatch(projects.updateChosenProject(project, resolve))
    },
    saveProjectID: (projectID) => {
      dispatch(projects.saveProjectID(projectID))
    },
    getProjectMembers: (projectID) => {
      dispatch(projects.getCurrentMembers(projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
