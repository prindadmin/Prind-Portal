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
    tempGetUserAccreditations: (username, accreditations, resolve, reject) => {
      dispatch(memberReducer.tempGetUserAccreditations(username, accreditations, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
