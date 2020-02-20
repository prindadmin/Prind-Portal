import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../../reducers/awsReducer'

import UserMenuComponent from './UserMenu'

const mapStatetoProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(reducer.init())
    },
    signOut: () => {
      dispatch(reducer.signOut())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(UserMenuComponent))
