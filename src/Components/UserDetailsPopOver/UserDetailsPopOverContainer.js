import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Element from './UserDetailsPopOver'

import * as memberReducer from '../../Reducers/memberReducer'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    members: state.members,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tempGetUserAccreditations: (username, accreditations) => {
      dispatch(memberReducer.tempGetUserAccreditations(username, accreditations))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
