import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../Reducers/userReducer'
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
    },
    requestS3ProjectFileUploadToken: (jwtToken, project_id, pageName) => {
      dispatch(userReducer.requestS3ProjectFileUploadToken(jwtToken, project_id, pageName))
    },
    getProjectMembers: (identityToken, projectID) => {
      dispatch(projectsReducer.getCurrentMembers(identityToken, projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
