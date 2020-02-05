import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Element from './Element'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Element))
