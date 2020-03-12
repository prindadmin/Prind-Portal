import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import HeaderBarComponent from './HeaderBar'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    user: state.user,
  }
}

// This defines all the actions that can be fetched from the reducer
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(HeaderBarComponent))
