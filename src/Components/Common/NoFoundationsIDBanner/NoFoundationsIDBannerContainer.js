import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import NoFoundationsIDBanner from './NoFoundationsIDBanner'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(NoFoundationsIDBanner))
