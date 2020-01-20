import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    pageDetails: state.pageDetails,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
