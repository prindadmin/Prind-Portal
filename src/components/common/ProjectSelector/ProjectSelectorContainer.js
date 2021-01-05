import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ProjectSelectorComponent from './ProjectSelector'

const mapStatetoProps = state => {
  return {
    projects: state.projects
  }
}

// This defines all the Actions that can be fetched from the reducer
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectSelectorComponent))
