import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../Reducers/userReducer'

import PageComponent from './ProfilePage'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (resolve, reject) => {
      dispatch(userReducer.getUserDetails(resolve, reject))
    },
    getProjectInvitations: () => {
      dispatch(userReducer.getProjectInvitations())
    },
    getSignatureRequests: () => {
      dispatch(userReducer.getSignatureRequests())
    },
    getHistory: (resolve, reject) => {
      dispatch(userReducer.getHistory(resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
