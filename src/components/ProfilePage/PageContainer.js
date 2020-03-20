import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../reducers/userReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (jwtToken, resolve, reject) => {
      dispatch(userReducer.getUserDetails(jwtToken, resolve, reject))
    },
    getProjectInvitations: (identityToken) => {
      dispatch(userReducer.getProjectInvitations(identityToken))
    },
    getSignatureRequests: (identityToken) => {
      dispatch(userReducer.getSignatureRequests(identityToken))
    },
    getHistory: (identityToken, resolve, reject) => {
      dispatch(userReducer.getHistory(identityToken, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
