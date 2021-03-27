import { connect } from 'react-redux'

import AppComponent from './App'

import * as auth from './Reducers/auth'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshSession: () => {
      dispatch(auth.refreshSession())
    },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppComponent)
