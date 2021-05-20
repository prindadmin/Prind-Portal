import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as auth from '../../../Reducers/auth'

import PageComponent from './SignUpBox'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(auth.init())
    },
    signUp: (userDetails, resolve, reject) => {
      dispatch(auth.signUp(userDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
