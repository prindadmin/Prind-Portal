import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import { Editor } from '@tinymce/tinymce-react';

import * as Strings from '../../../../Data/Strings'

// TODO: Style text editor when disabled
// TODO: Compare old and new text in some way (https://mergely.com/)
// TODO: Update in server as versioned (normally text isn't versioned, right?)


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
    }),
    pageName: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      updateInProgress: false,
      updateError: false,
      errorText: "",
      content: '',
    }
  }

  componentDidMount() {
    this.setState({
      content: this.props.elementContent.fieldDetails.textValue
    })
  }

  componentDidUpdate(prevProps) {
  }


  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  handleEditorChange = (e) => {
    console.log('Content was updated');
    this.setState({
      content: e.target.getContent()
    })
  }


  // When the user wants to save the changes, update the server
  saveChanges = (e) => {

    const { pageName, projects, elementContent } = this.props

    const fieldDetails = {
      textValue: this.state.content
    }

    this.setState({
      updateError: false,
      updateInProgress: true,
    })

    this.props.updateField(
      projects.chosenProject.projectId,
      pageName,
      elementContent.id,
      fieldDetails,
      this.saveResolve,
      this.saveReject,
    )
  }

  saveResolve = () => {
    this.setState({
      updateInProgress: false,
    })
  }

  saveReject = () => {
    this.setState({
      updateError: true,
      updateInProgress: false,
      errorText: Strings.ERROR_SAVING_CHANGES_TO_FIELD
    })
  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { title, description, fieldDetails, editable } = this.props.elementContent

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
            <Editor
              initialValue={fieldDetails.textValue}
              apikey={process.env.REACT_APP_TINY_API_KEY}
              disabled={!editable}
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
                  'undo redo | formatselect | bold italic | \
                  alignleft aligncenter alignright | \
                  bullist numlist outdent indent | help'
              }}
              onChange={this.handleEditorChange}
            />
          </div>

          <input
            type="submit"
            value={ Strings.BUTTON_SAVE_CHANGES }
            className="save-button"
            onClick={(e) => this.saveChanges(e)} />

        </div>
      </div>
    )
  }
}

export default GitText
