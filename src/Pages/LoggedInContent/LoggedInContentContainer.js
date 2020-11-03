import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../Reducers/userReducer'

import PageComponent from './LoggedInContent'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (username) => {
      //dispatch(userReducer.getUserProfileSettings(username))
      //dispatch(userReducer.getUserAccountSettings(username))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
