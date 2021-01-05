import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as reducer from '../../Reducers/PageReducers/tenderReducer'

import PageComponent from './TenderPage'

const mapStatetoProps = state => {
  return {
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
