import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PageComponent from './SideBar'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
