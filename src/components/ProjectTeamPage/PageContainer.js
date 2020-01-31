import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as memberReducer from '../../reducers/memberReducer'
import * as projectReducer from '../../reducers/projectsReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    members: state.members,
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMember: (jwtToken, projectID, memberValues) => {
      dispatch(memberReducer.addMemberToProject(jwtToken, projectID, memberValues))
    },
    removeMember: (jwtToken, projectID, memberEmail) => {
      dispatch(memberReducer.removeMemberFromProject(jwtToken, projectID, memberEmail))
    },
    getCurrentMembers: (jwtToken, projectID) => {
      dispatch(projectReducer.getCurrentMembers(jwtToken, projectID))
    },
    getRoles: (jwtToken, projectID) => {
      dispatch(memberReducer.getRoles(jwtToken, projectID))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
