import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../../reducers/projectsReducer'

import HeaderBarComponent from './HeaderBar'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects
  }
}

// This defines all the actions that can be fetched from the reducer
const mapDispatchToProps = dispatch => {
  return {
    getAccessibleProjects: (jwtToken) => {
      dispatch(reducer.getAccessibleProjects(jwtToken))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(HeaderBarComponent))
