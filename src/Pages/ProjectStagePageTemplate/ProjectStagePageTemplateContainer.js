import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as pageReducer from '../../Reducers/stagePageReducer'
import * as userReducer from '../../Reducers/userReducer'

import ProjectStagePageTemplate from './ProjectStagePageTemplate'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContent: (projectID, pageName, resolve, reject) => {
      dispatch(pageReducer.getPageContent(projectID, pageName, resolve, reject))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName) => {
      dispatch(userReducer.requestS3ProjectFileUploadToken(project_id, pageName))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectStagePageTemplate))
