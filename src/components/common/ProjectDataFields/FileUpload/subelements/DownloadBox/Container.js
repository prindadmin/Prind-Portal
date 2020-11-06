import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../../../../Reducers/projectsReducer'

import Element from './DownloadBox'

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadFile: (projectID, pageName, fieldID, version, resolve, reject) => {
      dispatch(projectsReducer.downloadFile(projectID, pageName, fieldID, version, resolve, reject))
    },
    resetDownloadURL: () => {
      dispatch(projectsReducer.resetDownloadURL())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
