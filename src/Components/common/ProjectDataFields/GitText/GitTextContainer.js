import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../../Reducers/projects'
import * as user from '../../../../Reducers/user'

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
      dispatch(projects.uploadFile(projectID, pageName, fieldID, fileDetails, fieldType, resolve, reject))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName, resolve, reject) => {
      dispatch(user.requestS3ProjectFileUploadToken(project_id, pageName, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(GitText))
