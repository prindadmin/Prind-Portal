import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';

// TODO: Implement styling depending on state

export class TextWriter extends Component {
  static propTypes = {
    originalContent: PropTypes.string.isRequired,
    onHandleContentChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  getEditor = () => {
    const { originalContent, disabled } = this.props
    return (
      <Editor
        initialValue={originalContent}
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
    return (
      <React.Fragment>
        { this.getEditor() }
      </React.Fragment>
    )
  }
}

export default TextWriter
