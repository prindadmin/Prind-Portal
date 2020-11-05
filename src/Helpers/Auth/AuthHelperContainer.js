import { connect } from 'react-redux'

import AuthHelper from './AuthHelper'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AuthHelper)
