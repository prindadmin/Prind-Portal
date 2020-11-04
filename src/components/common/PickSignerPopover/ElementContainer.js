import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../Reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestSignature: (jwtToken, projectID, pageName, fieldID, members, resolve, reject) => {
      dispatch(projectsReducer.requestSignature(jwtToken, projectID, pageName, fieldID, members, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
