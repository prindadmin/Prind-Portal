import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SignInPage from './SignInPage'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(SignInPage))
