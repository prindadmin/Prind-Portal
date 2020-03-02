import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    pageNames: state.pageNames,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
