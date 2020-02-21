import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../reducers/userReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    initialValues: state.user.details,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (jwtToken) => {
      dispatch(userReducer.getUserDetails(jwtToken))
    },
    updateUserDetails: (jwtToken, userDetails) => {
      dispatch(userReducer.updateUserDetails(jwtToken, userDetails))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
