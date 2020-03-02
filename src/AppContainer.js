import { connect } from 'react-redux'

import AppComponent from './App'

const mapStatetoProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn,
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppComponent)
