import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import * as awsReducer from '../../Reducers/awsReducer'
//import * as foundationsReducer from '../../Reducers/foundationsReducer'
//import * as memberReducer from '../../Reducers/memberReducer'
import * as projectsReducer from '../../Reducers/projectsReducer'
//import * as userReducer from '../../Reducers/userReducer'
//import * as inceptionReducer from '../../Reducers/PageReducers/inceptionReducer'

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
  return {
    getProjectMembers: () => {
      dispatch(projectsReducer.getCurrentMembers())
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PageComponent))
