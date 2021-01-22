import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';
import * as Diff from 'diff';

// TODO: Implement styling depending on state
const editorContentStyle = `mark.red { color: red; background: none; text-decoration: line-through; } mark.green { color: limegreen; background: none; } mark.grey { color: grey; background: none; }`;

export class Comparer extends Component {
  static propTypes = {
    oldContent: PropTypes.string.isRequired,
    newContent: PropTypes.string.isRequired,
  }

  // TODO: write the highlighting for the text based on differences
  addFormatting = () => {
    const diff = Diff.diffChars(this.props.oldContent, this.props.newContent);
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
    var displayContent = content
    if (isNew) {
      displayContent = this.addFormatting()
    }

    return (
      <Editor
        initialValue={displayContent}
        apikey={process.env.REACT_APP_TINY_API_KEY}
        disabled={true}
        init={{
          height: 500,
          menubar: false,
          content_style: editorContentStyle,
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

    this.addFormatting()

    return (
      <React.Fragment>
        <div className='comparer old'>
          { this.getEditor(oldContent, false) }
        </div>
        <div className='comparer new'>
          { this.getEditor(newContent, true) }
        </div>
      </React.Fragment>
    )
  }
}

export default Comparer
