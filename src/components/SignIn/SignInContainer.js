import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/awsReducer'

import SignInComponent from './SignIn'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(reducer.init())
    },
    signIn: (values) => {
      return new Promise((resolve, reject) => {
        dispatch(reducer.signIn(values, resolve, reject))
      })
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(SignInComponent))
