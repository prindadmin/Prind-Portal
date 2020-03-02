import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as awsReducer from '../../../reducers/awsReducer'
import * as userReducer from '../../../reducers/userReducer'

import UserMenuComponent from './UserMenu'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(awsReducer.init())
    },
    signOut: () => {
      dispatch(awsReducer.signOut())
    },
    getUserProjectInvitations: (identityToken, resolve, reject) => {
      dispatch(userReducer.getProjectInvitations(identityToken, resolve, reject))
    },
    getUserSignatureRequests: (identityToken, resolve, reject) => {
      dispatch(userReducer.getSignatureRequests(identityToken, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserMenuComponent))
