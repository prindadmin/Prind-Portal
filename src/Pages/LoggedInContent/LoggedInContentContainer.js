import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../Reducers/userReducer'
import * as projectsReducer from '../../Reducers/projectsReducer'

import PageComponent from './LoggedInContent'

const mapStatetoProps = state => {
  return {
    user: state.user,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectDetails: (project, resolve) => {
      dispatch(projectsReducer.updateChosenProject(null, project, resolve))
    },
    saveProjectID: (projectID) => {
      dispatch(projectsReducer.saveProjectID(projectID))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName) => {
      dispatch(userReducer.requestS3ProjectFileUploadToken(project_id, pageName))
    },
    getProjectMembers: (projectID) => {
      dispatch(projectsReducer.getCurrentMembers(projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
