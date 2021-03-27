import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PageComponent from './SignInUpBox'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
