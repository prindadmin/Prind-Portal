import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as foundationsReducer from '../../../../../../Reducers/foundationsReducer'
import * as projectsReducer from '../../../../../../Reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rejectSignatureRequest: (identityToken, requestDetails, resolve, reject) => {
      dispatch(foundationsReducer.rejectSignatureRequest(identityToken, requestDetails, resolve, reject))
    },
    updateChosenProject: (jwtToken, project, resolve, reject) => {
      dispatch(projectsReducer.updateChosenProject(jwtToken, project, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
