import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../Reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateField: (pageName, fieldDetails) => {
      dispatch(projectsReducer.updateField(pageName, fieldDetails))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
