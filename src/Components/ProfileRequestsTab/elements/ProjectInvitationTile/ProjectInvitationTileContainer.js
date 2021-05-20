import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as user from '../../../../Reducers/user'

import ProjectInvitationTile from './ProjectInvitationTile'

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    respondToProjectInvitation: (identityToken, projectID, response) => {
      dispatch(user.respondToProjectInvitation(identityToken, projectID, response))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectInvitationTile))
