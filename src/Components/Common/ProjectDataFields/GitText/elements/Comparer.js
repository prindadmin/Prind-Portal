import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';
import LoadingSpinner from '../../../LoadingSpinner'
import * as ComponentState from '../../ComponentStates'
import * as Diff from 'diff';

import * as Strings from '../../../../../Data/Strings'
import * as Constants from '../../Constants'

import getFileFromS3 from './getFileFromS3'

const EDITORCONTENTSTYLE = `mark.red { color: red; background: none; text-decoration: line-through; } mark.green { color: limegreen; background: none; } mark.grey { color: grey; background: none; }`;
const CONTENTBEFORESELECTION = `<h2>${Strings.GIT_TEXT_NO_FILE_VERSION_SELECTED}</h2>`

export class Comparer extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    fieldId: PropTypes.string.isRequired,
    user: PropTypes.shape({
      projectS3Token: PropTypes.shape({
        accessKeyId: PropTypes.string.isRequired,
        secretAccessKey: PropTypes.string.isRequired,
        sessionToken: PropTypes.string.isRequired,
      })
    }).isRequired,
    fileVersions: PropTypes.arrayOf(PropTypes.shape({
      ver: PropTypes.string,
      prevVer: PropTypes.string,
      s3VersionId: PropTypes.string,
      commitMessage: PropTypes.string,
    })),
    getNewToken: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      oldVersion: {
        initialContent: '',
        s3VersionId: props.fileVersions[0].s3VersionId,
        state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER
      },
      newVersion: {
        initialContent: '',
        s3VersionId: props.fileVersions[0].s3VersionId,
        state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER
      },
      state: ComponentState.QUIESCENT
    }
  }

  componentDidMount() {
    this.onSelectionChange(Constants.OLDSELECTOR, { target: { value: this.state.oldVersion.s3VersionId }})
    this.onSelectionChange(Constants.NEWSELECTOR, { target: { value: this.state.newVersion.s3VersionId }})
  }

  onSelectionChange = (selectorName, e) => {
    const s3VersionId = e.target.value
    const { projectId, pageName, fieldId, user } = this.props
    console.log(`SelectorName: ${selectorName}; S3 Version Requested: ${s3VersionId}`)

    // Create the download values
    const bucketName = process.env.REACT_APP_AWS_S3_USER_UPLOAD_BUCKET_NAME
    const key = `${projectId}/${pageName}/${fieldId}`

    // Create the download parameters
    var downloadParams = {
      Bucket: bucketName,
      Key: key,
      VersionId: s3VersionId,
    }

    this.setState({
      [selectorName]: {
        ...this.state[selectorName],
        s3VersionId
      }
    })

    getFileFromS3(user, downloadParams, selectorName, this.onProgressUpdate, this.onFileDownloadComplete, this.onFileDownloadFailed)
  }

  onProgressUpdate = (progress, selectorName) => {
    console.log(`${selectorName} progress: ${progress}`)
  }

  onFileDownloadComplete = (result, selectorName) => {
    console.log("File download successful")
    console.log(result)
    console.log(result.data.Body.toString())
    this.setState({
      [selectorName]: {
        ...this.state[selectorName],
        state: ComponentState.QUIESCENT,
        initialContent: result.data.Body.toString(),
      }
    })
  }

  onFileDownloadFailed = (error, selectorName) => {
    console.error("File download failed")
    console.error(error.message)

    const { projectId, pageName, getNewToken } = this.props
    getNewToken(projectId, pageName)

    this.setState({
      [selectorName]: {
        state: ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED
      }
    })
  }


  // Add colour formatting to the text
  // TODO: Add in tidying up of changed tags (see notes app)
  addFormatting = () => {
    console.log(this.state)

    if (this.state.oldVersion.initialContent === undefined || this.state.newVersion.initialContent === undefined) {
      console.warn("One of the contents was empty")
      console.warn(`old: ${this.state.oldVersion.initialContent}; new: ${this.state.newVersion.initialContent}`)
      return this.state.newVersion.initialContent
    }

    // Remove line breaks because they make things confusing when marking up
    const oldToCompare = this.state.oldVersion.initialContent//.replace(/\n/g, "")
    const newToCompare = this.state.newVersion.initialContent//.replace(/\n/g, "")

    const diff = Diff.diffLines(oldToCompare, newToCompare, {newlineIsToken: true});
    console.log(diff)
    var outputDifference = ''

    diff.forEach((part) => {
      // green for additions, red for deletions
      // no formatting for common parts
      const style = part.added ? "color: lawngreen; background: none;" :
                    part.removed ? "color: red; background: none; text-decoration: line-through;" :
                    ""

      if(style === '') {
        outputDifference += `${part.value}`
        return;
      }

      const markedUpClass = part.value.replaceAll(/<p /g, `<p style="${style}" `)

      outputDifference += markedUpClass
    })

    console.log(outputDifference)

    return outputDifference
  }


  getEditor = (content, shouldCompare, isNew) => {
    var displayContent = content.initialContent
    if (isNew && shouldCompare) {
      displayContent = this.addFormatting()
    }
    if (content === "") {
      displayContent = CONTENTBEFORESELECTION
    }

    return (
      <Editor
        value={displayContent}
        apikey={process.env.REACT_APP_TINY_API_KEY}
        disabled={true}
        init={{
          height: 500,
          menubar: false,
          content_style: EDITORCONTENTSTYLE,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
        }}
        onChange={(e) => function(){}}
      />
    )
  }


  // TODO: Load the latest version in componentDidMount for both old and new
  // TODO: Add "Please select version" as hidden option to the drop down
  getVersionSelectSystem = (selectorName) => {
    const { fileVersions } = this.props
    const { oldVersion, newVersion } = this.state
    const s3Ids = fileVersions.slice(1).map((version) => {
      return version.s3VersionId
    })

    const oldIndex = s3Ids.indexOf(oldVersion.s3VersionId)
    const newIndex = s3Ids.indexOf(newVersion.s3VersionId)

    console.log(`oldIndex: ${oldIndex}, newIndex: ${newIndex}`)

    // Map the fileVersions to options
    const options = fileVersions.slice(1).map((version, index) => {
      const date = new Date(version.uploadedDateTime)
      const displayDate = date.toISOString().split('T')[0]
      var isDisabled = false
      // If this is the old selector and the option is older than the new selector selection
      // disable the selection
      if (selectorName === Constants.OLDSELECTOR && index >= newIndex) {
        isDisabled = true
      }

      if (version.commitMessage === undefined) {
        return <option key={index} disabled={isDisabled} value={version.s3VersionId}>{`${displayDate} - ${Strings.GIT_TEXT_NO_COMMIT_MESSAGE_PROVIDED}`}</option>
      }

      return <option key={index} disabled={isDisabled} value={version.s3VersionId}>{`${displayDate} - ${version.commitMessage}`}</option>
    })

    const value = this.state[selectorName].s3VersionId

    return (
      <div className='version-select'>
        <select
          id={selectorName}
          name={selectorName}
          value={value}
          onChange={(e) => this.onSelectionChange(selectorName, e)}>
          {options}
        </select>
      </div>
    )
  }

  getErrorDownloading = (selectorName) => {
    return(
      <div className='error-text'>
        { Strings.ERROR_DOWNLOADING_TEXT_FOR_GIT_BOX }
        <input
          type="submit"
          value={ Strings.BUTTON_RETRY }
          className="save-button"
          onClick={(e) => this.onSelectionChange(selectorName, { target: { value: this.state[selectorName].s3VersionId }})} />
      </div>
    )
  }

  render() {
    const { oldVersion, newVersion } = this.state
    var shouldCompare = true
    if (oldVersion.initialContent === '' || newVersion.initialContent === '') {
      shouldCompare = false
    }

    console.log(this.state)

    return (
      <React.Fragment>
        <div className='comparators'>
          <div className='comparer old'>
            {
              this.state.oldVersion.state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER ?
              <LoadingSpinner /> :
              null
            }
            {
              this.state.oldVersion.state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED ?
              this.getErrorDownloading(Constants.OLDSELECTOR) :
              null
            }
            {
              this.state.oldVersion.state  === ComponentState.QUIESCENT ?
              <React.Fragment>
                { this.getVersionSelectSystem(Constants.OLDSELECTOR) }
                { this.getEditor(oldVersion, shouldCompare, false) }
              </React.Fragment> :
              null
            }
          </div>
          <div className='comparer new'>
            {
              this.state.newVersion.state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER ?
              <LoadingSpinner /> :
              null
            }
            {
              this.state.newVersion.state === ComponentState.DOWNLOADING_EXISTING_FILE_FROM_SERVER_FAILED ?
              this.getErrorDownloading(Constants.NEWSELECTOR) :
              null
            }
            {
              this.state.newVersion.state  === ComponentState.QUIESCENT ?
              <React.Fragment>
                { this.getVersionSelectSystem(Constants.NEWSELECTOR) }
                { this.getEditor(newVersion, shouldCompare, true) }
              </React.Fragment> :
              null
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Comparer
