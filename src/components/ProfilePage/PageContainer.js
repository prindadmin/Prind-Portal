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
    getUserDetails: (jwtToken) => {
      dispatch(userReducer.getUserDetails(jwtToken))
    },
    getProjectInvitations: (identityToken) => {
      dispatch(userReducer.getProjectInvitations(identityToken))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
