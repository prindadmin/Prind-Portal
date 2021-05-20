import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projects from '../../Reducers/projects'

import ProcoreProjectDoesNotExist from './ProcoreProjectDoesNotExist'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    resetChosenProject: () => {
      dispatch(projects.resetChosenProject())
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProcoreProjectDoesNotExist))
