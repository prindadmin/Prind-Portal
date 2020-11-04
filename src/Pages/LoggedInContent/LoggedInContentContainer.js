import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../Reducers/projectsReducer'

import PageComponent from './LoggedInContent'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectDetails: (idToken, project, resolve) => {
      dispatch(projectsReducer.updateChosenProject(idToken, project, resolve))
    },
    saveProjectID: (projectID) => {
      dispatch(projectsReducer.saveProjectID(projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
