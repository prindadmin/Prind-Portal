import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CurrentVersion from './CurrentVersion'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(CurrentVersion))
