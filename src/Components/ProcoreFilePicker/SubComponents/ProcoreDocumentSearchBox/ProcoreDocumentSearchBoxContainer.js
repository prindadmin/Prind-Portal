import { connect } from 'react-redux'
import ProcoreDocumentSearchBox from './ProcoreDocumentSearchBox'
import * as procoreReducer from '../../../../Reducers/procore'

const mapStatetoProps = state => {
  return {
    procore: state.procore
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchTerm: (searchTerm) => {
      dispatch(procoreReducer.updateSearchTerm(searchTerm))
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ProcoreDocumentSearchBox)
