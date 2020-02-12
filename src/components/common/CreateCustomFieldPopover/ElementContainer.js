import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as foundationsReducer from '../../../reducers/foundationsReducer'

import Element from './Element'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestSignatures: (jwtToken, projectID, pageName, fieldID, fieldDetails, members) => {
      dispatch(foundationsReducer.requestSignatures(jwtToken, projectID, pageName, fieldID, fieldDetails, members))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
