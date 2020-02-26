import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    fetching: state.user.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
