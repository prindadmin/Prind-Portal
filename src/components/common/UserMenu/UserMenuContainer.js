import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as auth from '../../../Reducers/auth'
import * as user from '../../../Reducers/user'
import * as stagePage from '../../../Reducers/stagePage'

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
      dispatch(stagePage.init())
    },
    getUserProjectInvitations: (resolve, reject) => {
      dispatch(user.getProjectInvitations(resolve, reject))
    },
    getUserSignatureRequests: (resolve, reject) => {
      dispatch(user.getSignatureRequests(resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserMenuComponent))
