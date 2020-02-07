import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as awsReducer from '../../reducers/awsReducer'
import * as foundationsReducer from '../../reducers/foundationsReducer'
import * as memberReducer from '../../reducers/memberReducer'
import * as projectsReducer from '../../reducers/projectsReducer'
import * as userReducer from '../../reducers/userReducer'

import * as inceptionReducer from '../../reducers/pageReducers/inceptionReducer'

import PageComponent from './Page'

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    projects: state.projects,
    pageContent: state.pageContent,
    foundations: state.foundations,
    members: state.members,
  }
}



const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
