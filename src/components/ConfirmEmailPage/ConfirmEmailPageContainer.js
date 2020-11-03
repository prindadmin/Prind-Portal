import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as awsReducer from '../../Reducers/awsReducer'

import ConfirmEmailPage from './ConfirmEmailPage'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    confirmUser: (userParameters, resolve, reject) => {
      dispatch(awsReducer.confirmUser(userParameters, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ConfirmEmailPage))
