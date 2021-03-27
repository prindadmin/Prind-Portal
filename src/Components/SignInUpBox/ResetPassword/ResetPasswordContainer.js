import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../../Reducers/auth'

import Component from './ResetPassword'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNewPassword: (values, resolve, reject) => {
      dispatch(reducer.changePassword(values, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Component))
