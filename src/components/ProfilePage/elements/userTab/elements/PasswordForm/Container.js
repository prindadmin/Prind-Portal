import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../../../../../Reducers/auth'

import PasswordForm from './passwordForm'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: (currentPassword, newPassword, resolve, reject) => {
      dispatch(reducer.updatePassword(currentPassword, newPassword, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PasswordForm))
