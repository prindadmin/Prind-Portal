import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../Reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    initialValues: {
      type: "file"
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createField: (projectID, pageName, fieldDetails, resolve, reject) => {
      dispatch(projectsReducer.createField(projectID, pageName, fieldDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
