import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/projects'

import PageComponent from './NewProjectPage'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (values, resolve, reject) => {
      console.log("create Project called")
      dispatch(reducer.createProject(values, resolve, reject))
    },
    resetChosenProject: () => {
      dispatch(reducer.resetChosenProject())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
