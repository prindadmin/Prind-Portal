import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as user from '../../Reducers/user'

import ProcoreAuthSendPage from './ProcoreAuthSendPage'

const mapStatetoProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authoriseWithProcoreServer: (parameters, resolve, reject) => {
      dispatch(user.authoriseWithProcoreServer(parameters, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProcoreAuthSendPage))
