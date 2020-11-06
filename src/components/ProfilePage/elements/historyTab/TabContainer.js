import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as userReducer from '../../../../Reducers/userReducer'

import Tab from './Tab'

const mapStatetoProps = state => {
  return {
    user: state.user,
    initialValues: state.user.details,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestS3UserFileUploadToken: (fileType) => {
      dispatch(userReducer.requestS3UserFileUploadToken(fileType))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Tab))
