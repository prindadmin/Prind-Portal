import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import AddNewTeamMember from './AddNewTeamMember'

import * as memberReducer from '../../Reducers/memberReducer'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    members: state.members,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMember: (projectID, memberValues, resolve, reject) => {
      dispatch(memberReducer.addMemberToProject(projectID, memberValues, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AddNewTeamMember))
