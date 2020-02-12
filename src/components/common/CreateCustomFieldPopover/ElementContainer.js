import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    initialValues: {
      type: "file"
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createField: (jwtToken, projectID, pageName, fieldDetails) => {
      dispatch(projectsReducer.createField(jwtToken, projectID, pageName, fieldDetails))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
