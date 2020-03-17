import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../reducers/awsReducer'

import ChangePasswordComponent from './ChangePassword'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    //changingPassword: state.accountDetails.changingPassword
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNewPassword: values => {
      return new Promise((resolve, reject) => {
        dispatch(reducer.changePassword(values, resolve, reject))
      })
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ChangePasswordComponent))
