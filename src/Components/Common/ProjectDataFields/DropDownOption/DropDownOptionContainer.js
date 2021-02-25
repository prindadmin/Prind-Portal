import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../../Reducers/projectsReducer'

import DropDownOption from './DropDownOption'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateField: (identityToken, projectID, pageName, fieldID, fieldDetails, resolve, reject) => {
      dispatch(projectsReducer.updateField(identityToken, projectID, pageName, fieldID, fieldDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(DropDownOption))
