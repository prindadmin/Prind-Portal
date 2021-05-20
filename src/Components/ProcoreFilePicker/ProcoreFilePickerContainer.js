import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as Procore from '../../Reducers/procore'

import ProcoreFilePicker from './ProcoreFilePicker'

const mapStatetoProps = state => {
  return {
    procore: state.procore,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectFilesAndFolders: (payload, resolve, reject) => {
      dispatch(Procore.getProjectFilesAndFolders(payload, resolve, reject))
    },
    updateSearchTerm: (searchTerm) => {
      dispatch(Procore.updateSearchTerm(searchTerm))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ProcoreFilePicker))
