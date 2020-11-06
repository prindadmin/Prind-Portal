import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as awsReducer from '../../../Reducers/awsReducer'
import * as userReducer from '../../../Reducers/userReducer'

import UserMenuComponent from './UserMenu'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
