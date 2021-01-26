import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as authReducer from '../../../Reducers/authReducer'

import PageComponent from './SignInBox'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (userDetails, resolve, reject) => {
      dispatch(authReducer.signIn(userDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
