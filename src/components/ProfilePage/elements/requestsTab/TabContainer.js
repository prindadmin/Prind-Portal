import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../reducers/userReducer'

import Tab from './Tab'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectInvitations: (identityToken) => {
      dispatch(userReducer.getProjectInvitations(identityToken))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Tab))
