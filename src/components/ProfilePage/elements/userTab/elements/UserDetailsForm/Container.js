import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../../../Reducers/userReducer'

import UserDetailsForm from './userDetailsForm'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    initialValues: state.user.details,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestS3UserFileUploadToken: (fileType) => {
      dispatch(userReducer.requestS3UserFileUploadToken(fileType))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserDetailsForm))
