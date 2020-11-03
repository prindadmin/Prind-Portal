import { connect } from 'react-redux'

import * as reducer from '../../Reducers/awsReducer'

import AuthComponent from './Auth'

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(reducer.getUser())
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AuthComponent)
