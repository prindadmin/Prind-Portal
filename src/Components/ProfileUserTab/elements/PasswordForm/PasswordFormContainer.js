import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../../../Reducers/auth'

import PasswordForm from './PasswordForm'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: (username, oldPassword, newPassword, resolve, reject) => {
      dispatch(reducer.updatePassword(username, oldPassword, newPassword, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PasswordForm))
