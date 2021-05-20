import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as auth from '../../Reducers/auth'
import * as user from '../../Reducers/user'
import * as projects from '../../Reducers/projects'

import PageComponent from './LoggedInContent'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    procore: state.procore,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetSite: () => {
      dispatch(auth.init())
    },
    getProjectDetails: (project, resolve) => {
      dispatch(projects.updateChosenProject(project, resolve))
    },
    saveProjectID: (projectID) => {
      dispatch(projects.saveProjectID(projectID))
    },
    getProjectMembers: (projectID) => {
      dispatch(projects.getCurrentMembers(projectID))
    },
    checkServerAccessToProcore: (resolve, reject) => {
      dispatch(user.checkServerAccessToProcore(resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
