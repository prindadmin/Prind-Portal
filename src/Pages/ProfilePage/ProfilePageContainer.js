import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as user from '../../Reducers/user'

import PageComponent from './ProfilePage'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (resolve, reject) => {
      dispatch(user.getUserDetails(resolve, reject))
    },
    getProjectInvitations: (resolve, reject) => {
      dispatch(user.getProjectInvitations(resolve, reject))
    },
    getSignatureRequests: (resolve, reject) => {
      dispatch(user.getSignatureRequests(resolve, reject))
    },
    getHistory: (resolve, reject) => {
      dispatch(user.getHistory(resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
