import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../../reducers/projectsReducer'

import ProjectSelectorComponent from './ProjectSelector'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    chosenProject: state.projects.chosenProject
  }
}

// This defines all the actions that can be fetched from the reducer
const mapDispatchToProps = dispatch => {
  return {
    updateChosenProject: (project) => {
      dispatch(reducer.updateChosenProject(project))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProjectSelectorComponent))
