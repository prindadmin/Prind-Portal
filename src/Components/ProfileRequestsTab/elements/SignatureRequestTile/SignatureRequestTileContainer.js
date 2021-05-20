import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as foundations from '../../../../Reducers/foundations'
import * as projects from '../../../../Reducers/projects'
import * as user from '../../../../Reducers/user'

import SignatureRequestTile from './SignatureRequestTile'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    rejectSignatureRequest: (requestDetails, resolve, reject) => {
      dispatch(foundations.rejectSignatureRequest(requestDetails, resolve, reject))
    },
    updateChosenProject: (project, resolve, reject) => {
      dispatch(projects.updateChosenProject(project, resolve, reject))
    },
    getSignatureRequests: () => {
      dispatch(user.getSignatureRequests())
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(SignatureRequestTile))
