import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Tab from './ProfileHistoryTab'

const mapStatetoProps = state => {
  return {
    user: state.user,
    initialValues: state.user.details,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Tab))
