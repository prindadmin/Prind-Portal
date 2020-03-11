import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../../../reducers/userReducer'
import * as projectsReducer from '../../../../../../reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    respondToSignatureInvitation: (identityToken, projectID, response) => {
      //dispatch(userReducer.respondToSignatureInvitation(identityToken, projectID, response))
      console.log("respondToSignatureInvitation not yet implemented")
    },
    updateChosenProject: (jwtToken, project, resolve, reject) => {
      dispatch(projectsReducer.updateChosenProject(jwtToken, project, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
