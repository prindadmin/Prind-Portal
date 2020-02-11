import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import * as awsReducer from '../../reducers/awsReducer'
import * as userReducer from '../../reducers/userReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    pageNames: state.pageNames,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(userReducer.init())
    },
    requestS3UploadToken: (jwt) => {
      dispatch(userReducer.requestS3UploadToken(jwt))
    }
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
