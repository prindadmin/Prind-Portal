import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ProcoreAuthReceivePage from './ProcoreAuthReceivePage'

const mapStatetoProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProcoreAuthReceivePage))
