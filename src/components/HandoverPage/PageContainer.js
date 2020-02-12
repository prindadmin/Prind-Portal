import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../reducers/pageReducers/handoverReducer'
import * as userReducer from '../../reducers/userReducer'
import * as projectsReducer from '../../reducers/projectsReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestS3UploadToken: (jwtToken, project_id, pageName) => {
      dispatch(userReducer.requestS3UploadToken(jwtToken, project_id, pageName))
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
