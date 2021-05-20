import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../Reducers/projects'

import PageComponent from './ProjectDetailsPage'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProjectDetails: (projectID, values, resolve, reject) => {
      dispatch(projectsReducer.updateProjectDetails(projectID, values, resolve, reject))
    },
    /*
    deleteProject: (projectID, resolve, reject) => {
      dispatch(projectsReducer.deleteProject(projectID, resolve, reject))
    },
    resetChosenProject: () => {
      dispatch(projectsReducer.resetChosenProject())
    }
    */
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
