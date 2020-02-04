import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsreducer from '../../../../../../reducers/projectsReducer'

import Element from './UploaderPopOver'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: (jwtToken, pageName, fileDetails) => {
      dispatch(projectsreducer.uploadFile(jwtToken, pageName, fileDetails))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
