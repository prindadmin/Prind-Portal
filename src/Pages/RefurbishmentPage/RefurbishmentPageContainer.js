import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/PageReducers/refurbishmentReducer'
//import * as userReducer from '../../Reducers/userReducer'
//import * as projectsReducer from '../../Reducers/projectsReducer'

import PageComponent from './RefurbishmentPage'

const mapStatetoProps = state => {
  return {
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContent: (projectID) => {
      dispatch(reducer.getPageContent(projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
