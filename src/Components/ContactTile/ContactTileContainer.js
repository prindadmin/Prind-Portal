import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as members from '../../Reducers/members'

import ContactTile from './ContactTile'

const mapStatetoProps = state => {
  return {
    user: state.user,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeMember: (projectID, memberUsername, resolve, reject) => {
      dispatch(members.removeMemberFromProject(projectID, memberUsername, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ContactTile))
