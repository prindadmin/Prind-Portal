import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as foundationsReducer from '../../../../../../reducers/foundationsReducer'

import Element from './CurrentVersion'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selfSignFile: (jwtToken, fieldDetails) => {
      dispatch(foundationsReducer.selfSignFile(jwtToken, fieldDetails))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
