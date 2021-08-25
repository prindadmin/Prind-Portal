import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as pageReducer from '../../Reducers/stagePage'
import * as user from '../../Reducers/user'

import ProjectStagePageWithStandards from './ProjectStagePageWithStandards'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    getContent: (projectID, pageName, resolve, reject) => {
      dispatch(pageReducer.getPageContent(projectID, pageName, resolve, reject))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName) => {
      dispatch(user.requestS3ProjectFileUploadToken(project_id, pageName))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectStagePageWithStandards))
