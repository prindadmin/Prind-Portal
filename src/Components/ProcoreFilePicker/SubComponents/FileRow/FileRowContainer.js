import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FileRow from './FileRow'
//import * as procoreReducer from '../../../../Reducers/procore'

const mapStatetoProps = state => {
  return {
    user: state.user,
    procore: state.procore,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(FileRow))
