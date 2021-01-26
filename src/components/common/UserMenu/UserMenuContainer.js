import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as authReducer from '../../../Reducers/authReducer'
import * as userReducer from '../../../Reducers/userReducer'
import * as stagePageReducer from '../../../Reducers/stagePageReducer'

import UserMenuComponent from './UserMenu'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(authReducer.signOut())
      dispatch(stagePageReducer.init())
    },
    getUserProjectInvitations: (resolve, reject) => {
      dispatch(userReducer.getProjectInvitations(resolve, reject))
    },
    getUserSignatureRequests: (resolve, reject) => {
      dispatch(userReducer.getSignatureRequests(resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserMenuComponent))
