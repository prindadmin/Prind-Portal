import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../reducers/awsReducer'

import ChangePasswordComponent from './ChangePassword'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    changingPassword: state.accountDetails.changingPassword
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: values => {
      return new Promise((resolve, reject) => {
        dispatch(reducer.changePassword(values, resolve, reject))
      })
    },
    changePasswordAccounts: (username, password) => {
      return new Promise ((resolve, reject) => {
        dispatch(reducer.completeNewPassword(username, password, resolve, reject))
      })
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ChangePasswordComponent))
