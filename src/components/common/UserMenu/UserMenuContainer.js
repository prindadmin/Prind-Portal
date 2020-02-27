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
    getUserProjectInvitations: (identityToken) => {
      dispatch(userReducer.getProjectInvitations(identityToken))
    },
    getUserSignatureInvitations: (identityToken) => {
      const ben = "bored"
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserMenuComponent))
