import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FileRow from './FileRow'
import * as procoreReducer from '../../../../Reducers/procore'

const mapStatetoProps = state => {
  return {
    user: state.user,
    procore: state.procore,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectFilesAndFolders: (payload, resolve, reject) => {
      dispatch(procoreReducer.getProjectFilesAndFolders(payload, resolve, reject))
    },
    requestDocumentAnchor: (payload, resolve, reject) => {
      //dispatch(procoreReducer.requestDocumentAnchor(payload, resolve, reject))
      console.log("integrate me into existing calls")
    },
    requestDocumentSelfSignature: (payload, resolve, reject) => {
      //dispatch(procoreReducer.requestDocumentSelfSignature(payload, resolve, reject))
      console.log("integrate me into existing calls")
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(FileRow))
