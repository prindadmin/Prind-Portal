import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as authReducer from '../../Reducers/authReducer'

import PageComponent from './SignUpBox'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(authReducer.init())
    },
    signUp: (userDetails, resolve, reject) => {
      dispatch(authReducer.signUp(userDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
