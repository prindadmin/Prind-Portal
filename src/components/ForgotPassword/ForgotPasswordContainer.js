import { connect } from 'react-redux'

import * as reducer from '../../Reducers/awsReducer'

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
      const email = values.email

      return new Promise((resolve, reject) => {
        dispatch(reducer.forgotPassword(email, resolve, reject))
      })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ForgotPasswordComponent)
