import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as auth from '../../../Reducers/auth'
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
      dispatch(auth.signOut())
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
