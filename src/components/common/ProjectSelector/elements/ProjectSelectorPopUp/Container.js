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
    getAccessibleProjects: (resolve, reject) => {
      dispatch(projectsReducer.getAccessibleProjects(resolve, reject))
    },
    updateChosenProject: (project, resolve, reject) => {
      dispatch(projectsReducer.updateChosenProject(project, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
