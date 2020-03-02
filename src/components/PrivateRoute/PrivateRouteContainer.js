import { connect } from 'react-redux'

import PrivateRouteComponent from './PrivateRoute'

import * as userReducer from '../../reducers/userReducer'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeRoute: (route) => {
      dispatch(userReducer.storeRoute(route))
    },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(PrivateRouteComponent)
