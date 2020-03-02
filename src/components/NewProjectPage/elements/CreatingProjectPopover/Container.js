import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import * as reducer from '../../../../reducers/projectsReducer'

import Component from './Component'

const mapStatetoProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Component))
