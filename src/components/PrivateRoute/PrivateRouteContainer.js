import { connect } from 'react-redux'

import PrivateRouteComponent from './PrivateRoute'

import * as userReducer from '../../Reducers/userReducer'
import * as projectsReducer from '../../Reducers/projectsReducer'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeRoute: (route) => {
      dispatch(userReducer.storeRoute(route))
    },
    updateChosenProject: (idToken, project, resolve) => {
      console.log("getting project details")
      dispatch(projectsReducer.updateChosenProject(idToken, project, resolve))
    },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(PrivateRouteComponent)
