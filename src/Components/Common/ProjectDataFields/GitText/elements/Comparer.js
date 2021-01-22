import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';

// TODO: Implement styling depending on state

export class Comparer extends Component {
  static propTypes = {
    oldContent: PropTypes.string.isRequired,
    newContent: PropTypes.string.isRequired,
  }

  getEditor = (content) => {
    return (
      <Editor
        initialValue={content}
        apikey={process.env.REACT_APP_TINY_API_KEY}
        disabled={true}
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
        onChange={(e) => function(){}}
      />
    )
  }

  render() {
    const { oldContent, newContent } = this.props
    return (
      <React.Fragment>
        <div className='comparer old'>
          { this.getEditor(oldContent) }
        </div>
        <div className='comparer new'>
          { this.getEditor(newContent) }
        </div>
      </React.Fragment>
    )
  }
}

export default Comparer
