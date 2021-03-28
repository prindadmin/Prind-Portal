import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../Reducers/projects'

import CreateCustomFieldPopover from './CreateCustomFieldPopover'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    createField: (projectID, pageName, fieldDetails, resolve, reject) => {
      dispatch(projects.createField(projectID, pageName, fieldDetails, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CreateCustomFieldPopover))
