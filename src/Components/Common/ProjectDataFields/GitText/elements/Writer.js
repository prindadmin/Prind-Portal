import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';

// TODO: Implement styling depending on state
// TODO: Add selector drop down to allow selection of different base versions to start edits from

export class TextWriter extends Component {
  static propTypes = {
    currentContent: PropTypes.shape({
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
    onHandleContentChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }


  onSelectionChange = (selectorName, e) => {
    console.log(selectorName)
    console.log(e.target.value)
    this.props.onRequestNewFileVersionData(e.target.value, selectorName)
  }


  getVersionSelectSystem = (selectorName) => {
    const { fileVersions } = this.props

    // Map the fileVersions to options
    const options = fileVersions.map((version, index) => {
      return <option key={index} value={version.s3VersionId}>{version.commitMessage}</option>
    })

    return (
      <div className='version-select'>
        <select
          name={selectorName}
          id={selectorName}
          value={this.props.currentContent.versionId}
          onChange={(e) => this.onSelectionChange(selectorName, e)}>
          {options}
        </select>
      </div>
    )
  }


  getEditor = () => {
    const { currentContent, disabled } = this.props
    return (
      <Editor
        initialValue={currentContent.originalContent}
        apikey={process.env.REACT_APP_TINY_API_KEY}
        disabled={disabled}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
        }}
        onChange={this.props.onHandleContentChange}
      />
    )
  }

  render() {

    console.log(this.props)

    return (
      <React.Fragment>
        { this.getVersionSelectSystem("oldContent") }
        { this.getEditor() }
      </React.Fragment>
    )
  }
}

export default TextWriter
