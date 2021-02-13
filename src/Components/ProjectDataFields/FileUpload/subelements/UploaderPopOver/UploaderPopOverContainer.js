import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../../../Reducers/projectsReducer'
import * as userReducer from '../../../../../Reducers/userReducer'

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
      dispatch(projectsReducer.uploadFile(projectID, pageName, fieldID, fileDetails, fieldType))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName) => {
      dispatch(userReducer.requestS3ProjectFileUploadToken(project_id, pageName))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UploaderPopOver))
