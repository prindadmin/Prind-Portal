import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../../../Reducers/projects'
import * as user from '../../../../../Reducers/user'

import UploaderPopOver from './UploaderPopOver'

const mapStatetoProps = state => {
  return {
    user: state.user,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: (projectID, pageName, fieldID, fileDetails, fieldType) => {
      dispatch(projects.uploadFile(projectID, pageName, fieldID, fileDetails, fieldType))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName) => {
      dispatch(user.requestS3ProjectFileUploadToken(project_id, pageName))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UploaderPopOver))
