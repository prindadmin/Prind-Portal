import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as projectsReducer from '../../../../Reducers/projectsReducer'
import * as userReducer from '../../../../Reducers/userReducer'

import GitText from './GitText'

const fileDetails = [
  {
    ver: "4",
    prevVer: "3",
    s3VersionId: "BvjG3l1kV4Wmqd4PpT5PlhMEEc42V4_g",
    commitMessage: "Latest Commit"
  },
  {
    ver: "1",
    prevVer: "0",
    s3VersionId: "u3.WYA9VlvVba2EY9NywkQHBExdKq9eA",
    commitMessage: "Oldest Commit"
  },
  {
    ver: "2",
    prevVer: "1",
    s3VersionId: "GndxW2exut63gfISgKr._bgLoxEBa1kh",
    commitMessage: "Intermediate Commit"
  },
  {
    ver: "3",
    prevVer: "2",
    s3VersionId: "IhHU28Y.7doCQmf9SijFU3M6C8VDCY5x",
    commitMessage: "Another intermediate Commit"
  },
  {
    ver: "4",
    prevVer: "3",
    s3VersionId: "BvjG3l1kV4Wmqd4PpT5PlhMEEc42V4_g",
    commitMessage: "Latest Commit"
  }
]

const mapStatetoProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    projects: state.projects,
    elementContent: {
      ...state.elementContent,
      fileDetails
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadFile: (projectID, pageName, fieldID, fileDetails, fieldType, resolve, reject) => {
      dispatch(projectsReducer.uploadFile(projectID, pageName, fieldID, fileDetails, fieldType, resolve, reject))
    },
    requestS3ProjectFileUploadToken: (project_id, pageName, resolve, reject) => {
      dispatch(userReducer.requestS3ProjectFileUploadToken(project_id, pageName, resolve, reject))
    },
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(GitText))
