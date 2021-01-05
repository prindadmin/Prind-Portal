import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as foundationsReducer from '../../../../../../Reducers/foundationsReducer'

import Element from './CurrentVersion'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selfSignFile: (projectID, pageName, fieldID) => {
      dispatch(foundationsReducer.selfSignFile(projectID, pageName, fieldID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
