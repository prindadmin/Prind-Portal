import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsreducer from '../../../../../../reducers/projectsReducer'

import Element from './FileDetailPopover'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadFile: (jwtToken, projectID, pageName, fieldID, version) => {
      dispatch(projectsreducer.downloadFile(jwtToken, projectID, pageName, fieldID, version))
    },
    resetDownloadURL: () => {
      dispatch(projectsreducer.resetDownloadURL())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
