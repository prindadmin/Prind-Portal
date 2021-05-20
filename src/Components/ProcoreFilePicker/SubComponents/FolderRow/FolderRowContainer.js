import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as Procore from '../../../../Reducers/procore'

import FolderRow from './FolderRow'

const mapStatetoProps = state => {
  return {
    procore: state.procore
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateFolderHistory: (folders) => {
      dispatch(Procore.updateFolderHistory(folders))
    },
    updateCurrentFolder: (folderId) => {
      dispatch(Procore.updateCurrentFolder(folderId))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(FolderRow))
