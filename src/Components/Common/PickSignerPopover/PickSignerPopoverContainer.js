import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../Reducers/projects'

import PickSignerPopover from './PickSignerPopover'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestSignature: (projectID, pageName, fieldID, members, resolve, reject) => {
      dispatch(projects.requestSignature(projectID, pageName, fieldID, members, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PickSignerPopover))
