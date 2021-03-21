import { connect } from 'react-redux'

import AppComponent from './App'

import * as authReducer from './Reducers/authReducer'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshSession: () => {
      dispatch(authReducer.refreshSession())
    },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppComponent)
