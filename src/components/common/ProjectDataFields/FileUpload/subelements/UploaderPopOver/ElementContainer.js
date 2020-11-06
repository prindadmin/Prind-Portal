import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsreducer from '../../../../../../Reducers/projectsReducer'

import Element from './UploaderPopOver'

const mapStatetoProps = state => {
  return {
    user: state.user,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: (projectID, pageName, fieldID, fileDetails) => {
      dispatch(projectsreducer.uploadFile(projectID, pageName, fieldID, fileDetails))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
