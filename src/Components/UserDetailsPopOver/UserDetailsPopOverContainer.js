import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Element from './UserDetailsPopOver'

import * as members from '../../Reducers/members'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    members: state.members,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tempGetUserAccreditations: (username, resolve, reject) => {
      dispatch(members.tempGetUserAccreditations(username, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
