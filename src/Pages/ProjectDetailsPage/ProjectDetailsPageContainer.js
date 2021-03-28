import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/projects'

import PageComponent from './ProjectDetailsPage'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    initialValues: state.projects.chosenProject,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProjectDetails: (projectID, values) => {
      dispatch(reducer.updateProjectDetails(projectID, values))
    },
    deleteProject: (projectID, resolve, reject) => {
      dispatch(reducer.deleteProject(projectID, resolve, reject))
    },
    resetChosenProject: () => {
      dispatch(reducer.resetChosenProject())
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
