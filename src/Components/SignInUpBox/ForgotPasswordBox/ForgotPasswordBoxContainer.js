import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as authReducer from '../../../Reducers/authReducer'

import ForgotPasswordBox from './ForgotPasswordBox'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (userDetails, resolve, reject) => {
      dispatch(authReducer.forgotPassword(userDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ForgotPasswordBox))
