import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../reducers/userReducer'

import Tab from './Tab'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    initialValues: state.user.details,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestS3UserFileUploadToken: (jwtToken, fileType) => {
      dispatch(userReducer.requestS3UserFileUploadToken(jwtToken, fileType))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Tab))
