import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/PageReducers/handoverReducer'
import * as userReducer from '../../Reducers/userReducer'
import * as projectsReducer from '../../Reducers/projectsReducer'

import PageComponent from './HandoverPage'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestS3ProjectFileUploadToken: (jwtToken, project_id, pageName) => {
      dispatch(userReducer.requestS3ProjectFileUploadToken(jwtToken, project_id, pageName))
    },
    getContent: (identityToken, projectID) => {
      dispatch(reducer.getPageContent(identityToken, projectID))
    },
    getProjectMembers: (identityToken, projectID) => {
      dispatch(projectsReducer.getCurrentMembers(identityToken, projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
