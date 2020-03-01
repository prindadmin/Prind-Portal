import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../../../../reducers/projectsReducer'

import Element from './DownloadBox'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadFile: (jwtToken, projectID, pageName, fieldID, version, resolve, reject) => {
      dispatch(projectsReducer.downloadFile(jwtToken, projectID, pageName, fieldID, version, resolve, reject))
    },
    resetDownloadURL: () => {
      dispatch(projectsReducer.resetDownloadURL())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
