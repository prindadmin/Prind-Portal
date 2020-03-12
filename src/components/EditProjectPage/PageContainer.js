import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../reducers/projectsReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    initialValues: state.projects.chosenProject,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProjectDetails: (jwtToken, projectID, values) => {
      dispatch(reducer.updateProjectDetails(jwtToken, projectID, values))
    },
    deleteProject: (jwtToken, projectID, resolve, reject) => {
      dispatch(reducer.deleteProject(jwtToken, projectID, resolve, reject))
    },
    resetChosenProject: () => {
      dispatch(reducer.resetChosenProject())
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
