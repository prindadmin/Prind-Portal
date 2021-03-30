import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as user from '../../../../Reducers/user'

import UserDetailsForm from './UserDetailsForm'

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
      dispatch(user.requestS3UserFileUploadToken(fileType))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserDetailsForm))
