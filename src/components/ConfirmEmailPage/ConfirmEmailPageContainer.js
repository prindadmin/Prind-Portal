import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/auth'

import ConfirmEmailPage from './ConfirmEmailPage'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    confirmUser: (userParameters, resolve, reject) => {
      dispatch(reducer.confirmUser(userParameters, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ConfirmEmailPage))
