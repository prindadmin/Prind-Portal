import { connect } from 'react-redux'

import * as reducer from '../../Reducers/authReducer'

import ForgotPasswordComponent from './ForgotPassword'

const mapStatetoProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(reducer.init())
    },
    sendCode: (values) => {
      const username = values.email

      return new Promise((resolve, reject) => {
        dispatch(reducer.forgotPassword(username, resolve, reject))
      })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ForgotPasswordComponent)
