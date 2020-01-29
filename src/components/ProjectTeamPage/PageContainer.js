import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../reducers/memberReducer'

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
    addMember: (jwtToken, projectID, memberValues) => {
      dispatch(reducer.addMemberToProject(jwtToken, projectID, memberValues))
    },
    removeMember: (jwtToken, projectID, memberEmail) => {
      dispatch(reducer.removeMemberFromProject(jwtToken, projectID, memberEmail))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
