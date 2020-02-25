import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as awsReducer from '../../../../../../reducers/awsReducer'

import PasswordForm from './passwordForm'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: (currentPassword, newPassword) => {
      dispatch(awsReducer.completeNewPassword(currentPassword, newPassword))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PasswordForm))
