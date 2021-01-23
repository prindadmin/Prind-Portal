import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';
import * as Diff from 'diff';

import * as Strings from '../../../../../Data/Strings'

// TODO: Implement styling depending on state
const editorContentStyle = `mark.red { color: red; background: none; text-decoration: line-through; } mark.green { color: limegreen; background: none; } mark.grey { color: grey; background: none; }`;
const contentBeforeSelection = `<h2>${Strings.GIT_TEXT_NO_FILE_VERSION_SELECTED}</h2>`

export class Comparer extends Component {
  static propTypes = {
    oldContent: PropTypes.string.isRequired,
    newContent: PropTypes.string.isRequired,
  }

  // Add colour formatting to the text
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
    if (content === "") {
      displayContent = contentBeforeSelection
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

  // TODO: Add on select functionality
  onSelectionChange = (selectorName, e) => {
    console.log(selectorName)
    console.log(e.target.value)
  }

  // TODO: Load the latest version in componentDidMount for both old and new
  // TODO: Fill with options by mapping redux store data
  getVersionSelectSystem = (selectorName) => {
    return (
      <div className='version-select'>
        <select name={selectorName} id={selectorName} onChange={(e) => this.onSelectionChange(selectorName, e)}>
          <option value="Version 1">Version 1</option>
          <option value="Version 2">Version 2</option>
          <option value="Version 3">Version 3</option>
          <option value="Version 4">Version 4</option>
        </select>
      </div>
    )
  }

  render() {
    const { oldContent, newContent } = this.props

    return (
      <React.Fragment>
        <div className='comparators'>
          <div className='comparer old'>
            { this.getVersionSelectSystem("oldContent") }
            { this.getEditor(oldContent, false) }
          </div>
          <div className='comparer new'>
            { this.getVersionSelectSystem("newContent") }
            { this.getEditor(newContent, true) }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Comparer
