import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../Reducers/userReducer'
import * as projectsReducer from '../../Reducers/projectsReducer'

import PageComponent from './LoggedInContent'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectDetails: (project, resolve) => {
      dispatch(projectsReducer.updateChosenProject(project, resolve))
    },
    saveProjectID: (projectID) => {
      dispatch(projectsReducer.saveProjectID(projectID))
    },
    getProjectMembers: (projectID) => {
      dispatch(projectsReducer.getCurrentMembers(projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
