import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../../Reducers/projectsReducer'
import * as userReducer from '../../../../Reducers/userReducer'

import GitText from './GitText'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: (projectID, pageName, fieldID, fileDetails, fieldType, resolve, reject) => {
      dispatch(projectsReducer.uploadFile(projectID, pageName, fieldID, fileDetails, fieldType, resolve, reject))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName, resolve, reject) => {
      dispatch(userReducer.requestS3ProjectFileUploadToken(project_id, pageName, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(GitText))
