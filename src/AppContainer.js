import { connect } from 'react-redux'

import AppComponent from './App'

import * as auth from './Reducers/auth'
import * as procore from './Reducers/procore'

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
    storeProcoreDetails: (parameters) => {
      dispatch(procore.storeProcoreDetails(parameters))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppComponent)
