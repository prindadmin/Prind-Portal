import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as user from '../../Reducers/user'

import PageComponent from './Page'

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
    getProjectInvitations: () => {
      dispatch(user.getProjectInvitations())
    },
    getSignatureRequests: () => {
      dispatch(user.getSignatureRequests())
    },
    getHistory: (identityToken, resolve, reject) => {
      dispatch(user.getHistory(identityToken, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
