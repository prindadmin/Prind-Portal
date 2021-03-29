import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as user from '../../../../Reducers/user'

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
      dispatch(user.requestS3UserFileUploadToken(fileType))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Tab))
