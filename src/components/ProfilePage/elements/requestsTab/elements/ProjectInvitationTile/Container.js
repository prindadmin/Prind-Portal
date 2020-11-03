import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../../../Reducers/userReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    respondToProjectInvitation: (identityToken, projectID, response) => {
      dispatch(userReducer.respondToProjectInvitation(identityToken, projectID, response))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
