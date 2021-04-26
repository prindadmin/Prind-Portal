import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FolderRow from './FolderRow'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(FolderRow))
