import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// TODO: Add Resolve + Reject to create field

import * as projectsReducer from '../../../../reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createField: (jwtToken, pageName, fieldDetails) => {
      dispatch(projectsReducer.createField(jwtToken, pageName, fieldDetails))
    },
    updateField: (identityToken, projectID, pageName, fieldID, fieldDetails, resolve, reject) => {
      dispatch(projectsReducer.updateField(identityToken, projectID, pageName, fieldID, fieldDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
