import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../../../Reducers/projectsReducer'

import Element from './ProjectSelectorPopUp'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccessibleProjects: (jwtToken, resolve, reject) => {
      dispatch(projectsReducer.getAccessibleProjects(jwtToken, resolve, reject))
    },
    updateChosenProject: (jwtToken, project, resolve, reject) => {
      dispatch(projectsReducer.updateChosenProject(jwtToken, project, resolve, reject))
    },
    resetChosenProject: () => {
      dispatch(projectsReducer.resetChosenProject())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
