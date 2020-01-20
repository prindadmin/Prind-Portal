import { connect } from 'react-redux'

import * as reducer from '../../reducers/awsReducer'

import SignInComponent from './SignIn'

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
    signIn: (values) => {
      return new Promise((resolve, reject) => {
        dispatch(reducer.signIn(values, resolve, reject))
      })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SignInComponent)
