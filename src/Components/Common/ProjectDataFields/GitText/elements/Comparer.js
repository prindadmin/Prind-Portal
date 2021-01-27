import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';
import * as Diff from 'diff';

import * as Strings from '../../../../../Data/Strings'
import * as Constants from '../../Constants'

// TODO: Implement styling depending on state
const EDITORCONTENTSTYLE = `mark.red { color: red; background: none; text-decoration: line-through; } mark.green { color: limegreen; background: none; } mark.grey { color: grey; background: none; }`;
const CONTENTBEFORESELECTION = `<h2>${Strings.GIT_TEXT_NO_FILE_VERSION_SELECTED}</h2>`


export class Comparer extends Component {
  static propTypes = {
    oldVersion: PropTypes.shape({
      content: PropTypes.string.isRequired,
      versionId: PropTypes.string.isRequired,
    }).isRequired,
    newVersion: PropTypes.shape({
      originalContent: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      versionId: PropTypes.string.isRequired,
    }).isRequired,
    fileVersions: PropTypes.arrayOf(PropTypes.shape({
      ver: PropTypes.string,
      prevVer: PropTypes.string,
      s3VersionId: PropTypes.string,
      commitMessage: PropTypes.string,
    })),
    onRequestNewFileVersionData: PropTypes.func.isRequired,
  }

  // Add colour formatting to the text
  addFormatting = () => {
    console.log(this.props)
    const diff = Diff.diffWords(this.props.oldContent, this.props.newContent);
    var outputDifference = ''

    diff.forEach((part) => {
      // green for additions, red for deletions
      // grey for common parts
      const colour = part.added ? 'green' :
                     part.removed ? 'red' : 'grey';

      if(colour === 'grey') {
        outputDifference += `${part.value}`
        return;
      }

      outputDifference += `<mark class="${colour}">${part.value}</mark>`
    })

    return (outputDifference)
  }


  getEditor = (content, isNew) => {
    var displayContent = content.content
    if (isNew) {
      displayContent = this.addFormatting()
    }
    if (content === "") {
      displayContent = CONTENTBEFORESELECTION
    }

    return (
      <Editor
        initialValue={displayContent}
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

  // TODO: Add on select functionality
  onSelectionChange = (selectorName, e) => {
    console.log(selectorName)
    console.log(e.target.value)

    this.props.onRequestNewFileVersionData(e.target.value, selectorName)
  }


  // TODO: Load the latest version in componentDidMount for both old and new
  // TODO: Add "Please select version" as hidden option to the drop down
  getVersionSelectSystem = (selectorName) => {

    console.log(selectorName)

    const { fileVersions, oldVersion, newVersion } = this.props
    const s3Ids = fileVersions.map((version) => {
      return version.s3VersionId
    })

    const oldIndex = s3Ids.indexOf(oldVersion.versionId)
    const newIndex = s3Ids.indexOf(newVersion.versionId)

    console.log(`oldIndex: ${oldIndex}, newIndex: ${newIndex}`)

    // Map the fileVersions to options
    const options = fileVersions.map((version, index) => {
      // If this is the old selector and the option is older than the new selector selection
      // disable the selection
      if (selectorName === Constants.OLDSELECTOR && index >= newIndex) {
        return <option key={index} disabled value={version.s3VersionId}>{version.commitMessage}</option>
      }
      return <option key={index} value={version.s3VersionId}>{version.commitMessage}</option>
    })

    const value = selectorName === Constants.OLDSELECTOR ? oldVersion.versionId : newVersion.versionId

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

  render() {
    const { oldVersion, newVersion } = this.props

    console.log(this.props)

    return (
      <React.Fragment>
        <div className='comparators'>
          <div className='comparer old'>
            { this.getVersionSelectSystem(Constants.OLDSELECTOR) }
            { this.getEditor(oldVersion, false) }
          </div>
          <div className='comparer new'>
            { this.getVersionSelectSystem(Constants.NEWSELECTOR) }
            { this.getEditor(newVersion, true) }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Comparer
