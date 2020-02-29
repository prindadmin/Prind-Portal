import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ProjectSelectorComponent from './ProjectSelector'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects
  }
}

// This defines all the actions that can be fetched from the reducer
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectSelectorComponent))
