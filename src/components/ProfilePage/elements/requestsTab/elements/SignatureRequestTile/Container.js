import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as foundationsReducer from '../../../../../../Reducers/foundationsReducer'
import * as projectsReducer from '../../../../../../Reducers/projectsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rejectSignatureRequest: (requestDetails, resolve, reject) => {
      dispatch(foundationsReducer.rejectSignatureRequest(requestDetails, resolve, reject))
    },
    updateChosenProject: (project, resolve, reject) => {
      dispatch(projectsReducer.updateChosenProject(project, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
