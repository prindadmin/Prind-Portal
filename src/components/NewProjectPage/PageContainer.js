import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../reducers/projectsReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (jwtToken, values) => {
      dispatch(reducer.createProject(jwtToken, values))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
