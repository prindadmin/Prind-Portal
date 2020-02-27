import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as memberReducer from '../../../../reducers/memberReducer'

import ContactTile from './ContactTile'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeMember: (jwtToken, projectID, memberUsername, resolve, reject) => {
      dispatch(memberReducer.removeMemberFromProject(jwtToken, projectID, memberUsername, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ContactTile))
