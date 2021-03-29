import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import HeaderBarComponent from './HeaderBar'

import * as user from '../../Reducers/user'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    user: state.user,
  }
}

// This defines all the Actions that can be fetched from the reducer
const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: (resolve, reject) => {
      dispatch(user.getUserDetails(resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(HeaderBarComponent))
