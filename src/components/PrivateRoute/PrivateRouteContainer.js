import { connect } from 'react-redux'

import PrivateRouteComponent from './PrivateRoute'

import * as user from '../../Reducers/user'
import * as projects from '../../Reducers/projects'

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
      //console.log(`Storing route: ${route}`)
      dispatch(user.storeRoute(route))
    },
    updateChosenProject: (idToken, project, resolve) => {
      console.log("getting project details")
      dispatch(projects.updateChosenProject(idToken, project, resolve))
    },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(PrivateRouteComponent)
