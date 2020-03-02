import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// TODO: Add resolver and rejector to updateChosenProject

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
    createProject: (jwtToken, values, resolve, reject) => {
      dispatch(reducer.createProject(jwtToken, values, resolve, reject))
    },
    setCurrentProject: (jwtToken, values) => {
      dispatch(reducer.updateChosenProject(jwtToken, values))
    },
    resetChosenProject: () => {
      dispatch(reducer.resetChosenProject())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
