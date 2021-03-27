import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as auth from '../../../Reducers/auth'

import ForgotPasswordBox from './ForgotPasswordBox'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (userDetails, resolve, reject) => {
      dispatch(auth.forgotPassword(userDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ForgotPasswordBox))
