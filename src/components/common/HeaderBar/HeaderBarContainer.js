import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import HeaderBarComponent from './HeaderBar'

import * as userReducer from '../../../reducers/userReducer'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    user: state.user,
  }
}

// This defines all the actions that can be fetched from the reducer
const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (jwtToken, resolve, reject) => {
      dispatch(userReducer.getUserDetails(jwtToken, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(HeaderBarComponent))
