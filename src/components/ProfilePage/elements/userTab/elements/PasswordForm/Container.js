import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as awsReducer from '../../../../../../Reducers/awsReducer'

import PasswordForm from './passwordForm'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: (currentPassword, newPassword, resolve, reject) => {
      dispatch(awsReducer.completeNewPassword(currentPassword, newPassword, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PasswordForm))
