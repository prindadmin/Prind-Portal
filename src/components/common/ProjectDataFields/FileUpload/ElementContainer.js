import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../reducers/userReducer'

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
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
