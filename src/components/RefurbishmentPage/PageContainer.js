import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../reducers/pageReducers/refurbishmentReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    projects: state.projects,
    pageContent: state.pageContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContent: (identityToken, projectID) => {
      dispatch(reducer.getPageContent(identityToken, projectID))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
