import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../reducers/userReducer'
import * as projectsReducer from '../../../../reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestS3UploadToken: (jwtToken) => {
      dispatch(userReducer.getS3UploadToken(jwtToken))
    },
    createField: (jwtToken, pageName, fieldDetails) => {
      dispatch(projectsReducer.createField(jwtToken, pageName, fieldDetails))
    },
    updateField: (jwtToken, pageName, fieldDetails) => {
      dispatch(projectsReducer.updateField(jwtToken, pageName, fieldDetails))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
