import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as memberReducer from '../../Reducers/memberReducer'
import * as projectReducer from '../../Reducers/projectsReducer'

import PageComponent from './ProjectTeamPage'

const mapStatetoProps = state => {
  return {
    members: state.members,
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMember: (projectID, memberValues, resolve, reject) => {
      dispatch(memberReducer.addMemberToProject(projectID, memberValues, resolve, reject))
    },
    getCurrentMembers: (projectID) => {
      dispatch(projectReducer.getCurrentMembers(projectID))
    },
    getRoles: (projectID) => {
      dispatch(memberReducer.getRoles(projectID))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
