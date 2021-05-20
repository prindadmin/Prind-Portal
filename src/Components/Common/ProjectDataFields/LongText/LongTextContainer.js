import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../../Reducers/projects'

import LongText from './LongText'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateField: (projectID, pageName, fieldID, fieldDetails, resolve, reject) => {
      dispatch(projects.updateField(projectID, pageName, fieldID, fieldDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(LongText))
