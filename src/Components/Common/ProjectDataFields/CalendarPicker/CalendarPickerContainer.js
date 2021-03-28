import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../../Reducers/projects'

import CalendarPicker from './CalendarPicker'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateField: (identityToken, projectID, pageName, fieldID, fieldDetails, resolve, reject) => {
      dispatch(projects.updateField(identityToken, projectID, pageName, fieldID, fieldDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CalendarPicker))
