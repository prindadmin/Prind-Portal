import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../Reducers/projects'

import FileUploader from './FileUploader'

const mapStatetoProps = state => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /*
    updateField: (pageName, fieldDetails) => {
      dispatch(projects.updateField(pageName, fieldDetails))
    }
    */
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(FileUploader))
