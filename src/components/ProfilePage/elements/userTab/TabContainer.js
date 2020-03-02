import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Tab from './Tab'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Tab))
