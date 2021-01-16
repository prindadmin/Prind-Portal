import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import AddNewTeamMember from './AddNewTeamMember'

const mapStatetoProps = state => {
  return {
    members: state.members,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AddNewTeamMember))
