import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as members from '../../Reducers/members'
import * as projectReducer from '../../Reducers/projects'

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
    getCurrentMembers: (projectID) => {
      dispatch(projectReducer.getCurrentMembers(projectID))
    },
    getRoles: (projectID) => {
      dispatch(members.getRoles(projectID))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
