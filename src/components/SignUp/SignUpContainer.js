import { connect } from 'react-redux'

import * as reducer from '../../reducers/awsReducer'

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

export default connect(mapStatetoProps, mapDispatchToProps)(SignUpComponent)
