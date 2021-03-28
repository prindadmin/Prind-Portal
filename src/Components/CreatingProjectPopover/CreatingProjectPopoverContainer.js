import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import * as reducer from '../../../../Reducers/projects'

import Component from './CreatingProjectPopover'

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Component))
