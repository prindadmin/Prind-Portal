import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../../../Reducers/projects'

import DownloadBox from './DownloadBox'

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    downloadFile: (projectID, pageName, fieldID, version, resolve, reject) => {
      dispatch(projects.downloadFile(projectID, pageName, fieldID, version, resolve, reject))
    },
    resetDownloadURL: () => {
      dispatch(projects.resetDownloadURL())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(DownloadBox))
