import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../Reducers/projects'

import ProjectTemplatesSection from './ProjectTemplatesSection'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProjectDetails: (projectID, values, resolve, reject) => {
      dispatch(projectsReducer.updateProjectDetails(projectID, values, resolve, reject))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectTemplatesSection))
