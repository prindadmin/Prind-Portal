import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../../../../Reducers/projects'

import ProjectSelectorPopUp from './ProjectSelectorPopUp'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccessibleProjects: (resolve, reject) => {
      dispatch(projects.getAccessibleProjects(resolve, reject))
    },
    updateChosenProject: (project, resolve, reject) => {
      dispatch(projects.updateChosenProject(project, resolve, reject))
    },
    resetChosenProject: () => {
      dispatch(projects.resetChosenProject())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectSelectorPopUp))
