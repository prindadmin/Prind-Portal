import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AWS from 'aws-sdk';

import ItemIcon from '../../ItemIcon'

import * as Strings from '../../../../Data/Strings'
import * as ComponentState from '../ComponentStates'

import Writer from './elements/Writer'
import Comparer from './elements/Comparer'
import LoadingSpinner from '../../LoadingSpinner'


// TODO: Remove this once server sends this data
/*const FILEDETAILS = [
  {
    ver: "5",
    prevVer: "4",
    s3VersionId: "wq2BhVu69txu8sfN_fav3I1jbzA2tt_P",
    commitMessage: "Version 5"
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
  },
  {
    ver: "5",
    prevVer: "4",
    s3VersionId: "wq2BhVu69txu8sfN_fav3I1jbzA2tt_P",
    commitMessage: "Version 5"
  }

]*/


export class GitText extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      fieldDetails: PropTypes.shape({
        textValue: PropTypes.string,
      }).isRequired,
      fileDetails: PropTypes.arrayOf(PropTypes.shape({
        uploadedDateTime: PropTypes.string,
        uploadedBy: PropTypes.string,
        ver: PropTypes.string,
        prevVer: PropTypes.string,
        s3VersionId: PropTypes.string,
        uploadName: PropTypes.string,
        commitMessage: PropTypes.string,
      })).isRequired,
    }),
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      state: ComponentState.QUIESCENT,
      view: ComponentState.GIT_TEXT_WRITER_OPEN,
      errorMessage: "",
      editable: false,
    }

    // TODO: Remove this once server sends this data
    //props.elementContent.fileDetails = FILEDETAILS
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.projectS3Token !== prevProps.user.projectS3Token) {
      this.configureAWSAuthorisation(this.props.user.projectS3Token)
    }
  }


  configureAWSAuthorisation = (token) => {
    console.log("configuring AWS auth")

    // Update credentials to allow access to S3
    const { AccessKeyId, SecretAccessKey, SessionToken } = token
    AWS.config.update({
      credentials: {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretAccessKey,
        sessionToken: SessionToken
      }
    });
    return;
  }


  getEditor = () => {
    if (this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN) {
      return (
        <Writer
          projectId={this.props.projectId}
          pageName={this.props.pageName}
          fieldId={this.props.elementContent.id}
          user={this.props.user}
          fileVersions={this.props.elementContent.fileDetails}
          onContentChanged={(e) => console.log(e)}
          disabled={!this.props.elementContent.editable}
          uploadFile={this.props.uploadFile}
          getNewToken={this.props.requestS3ProjectFileUploadToken}/>
      )
    }

    return (
      <Comparer
        projectId={this.props.projectId}
        pageName={this.props.pageName}
        fieldId={this.props.elementContent.id}
        user={this.props.user}
        fileVersions={this.props.elementContent.fileDetails}
        getNewToken={this.props.requestS3ProjectFileUploadToken} />
    )
  }


  // TODO: style button
  getChangeViewButtons = () => {
    const isWriter = this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN
    const changeTo = this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN ? ComponentState.GIT_TEXT_COMPARER_OPEN : ComponentState.GIT_TEXT_WRITER_OPEN
    const title = this.state.view === ComponentState.GIT_TEXT_WRITER_OPEN ? Strings.GIT_TEXT_OPEN_COMPARER : Strings.GIT_TEXT_OPEN_WRITER

    return(
      <div className='switch-state-buttons'>
        <button
          title={title}
          className="view-change-button btn-primary"
          onClick={(e) => this.setState({view: changeTo})} >
          <ItemIcon size='3x' type={isWriter ? 'columns' : 'edit'} />
        </button>
      </div>
    )
  }


  render() {
    const { title, description, fileDetails } = this.props.elementContent
    const { state } = this.state
    return (
      <div id='git-text-element'>
        <div className='git-text-element-container'>
          <div className='element-title'>
            {title}
          </div>

          <div className='element-description'>
            {description}
          </div>

          <div className='container'>
            {
              state === ComponentState.QUIESCENT ? this.getEditor() : null
            }
            {
              state === ComponentState.NO_S3_TOKEN_AVAILABLE ? <LoadingSpinner /> : null
            }
          </div>
          {
            state === ComponentState.QUIESCENT && fileDetails.length !== 0 ?
            this.getChangeViewButtons() :
            null
          }
        </div>
      </div>
    )
  }
}

export default GitText
