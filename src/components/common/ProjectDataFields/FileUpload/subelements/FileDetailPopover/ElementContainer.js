import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Element from './FileDetailPopover'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
