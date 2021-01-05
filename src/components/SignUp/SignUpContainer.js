import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/authReducer'

import SignUpComponent from './SignUp'

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
    signUp: (values) => {
      return new Promise((resolve, reject) => {
        dispatch(reducer.signUp(values, resolve, reject))
      })
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(SignUpComponent))
