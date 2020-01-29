import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  FileInput,
  ButtonGroup,
  Button,
  Intent,
} from '@blueprintjs/core'

import * as strings from '../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  }

  // TODO: Create functionality to say file has uploaded successfully

  constructor() {
    super()
    this.state = {
      detailedView: false,
      filePrompt: strings.FILE_PROMPT,
      hasChosenFile: false,
      uploadFileRequsted: false,
      fileHasUploaded: false,
    }
  }

  componentDidMount() {
    //console.log(this.props.elementContent)
  }

  componentDidUpdate(prevProps) {
  }

  // Toggle between the detailed and minimized views of the element
  onElementClick = () => {
    this.setState({
      detailedView: !this.state.detailedView,
    })
  }

  // ---------------------- DEFAULT FUNCTIONALITY ABOVE THIS LINE -----------------------

  // Update the text inside the file picker
  fileChosen = (e) => {
    this.setState({
      filePrompt: e.target.value.replace("C:\\fakepath\\", ""),
      hasChosenFile: true,
    })
  }

  // Perform actions to upload file
  submitFile = (e) => {
    console.log("file submit clicked")
    this.setState({
      hasChosenFile: false,
      uploadFileRequsted: true,
    })
    e.stopPropagation();
  }

  uploadHistory = () => {
    return (
      <div className='upload-history'>
        This will be the file's upload history
      </div>
    )
  }

  signatureHistory = () => {
    return (
      <div className='signature-history'>
        This will be the file's signature history
      </div>
    )
  }

  fileStatus = () => {

    var status = null

    if (this.state.fileHasUploaded) {
      status = strings.FILE_SUCCESSFULLY_UPLOADED
    }

    if (this.state.uploadFileRequsted) {
      status = strings.FILE_UPLOADING
    }

    if (this.state.hasChosenFile) {
      status = strings.FILE_READY_TO_UPLOAD
    }

    if (status === null) {
      status = strings.FILE_NOT_SELECTED
    }

    return (
      "Status: " + status
    )

  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { detailedView, filePrompt } = this.state
    const { elementContent } = this.props

    // TODO: Make the request signature a field for searching for project members and a click to add

    return (
      <div id='file-upload-element'>
        <div className='file-upload-element-container' onClick={(e) => this.onElementClick()}>
          <div className='element-title'>
            {elementContent.title}
          </div>
          <div className='element-description'>

          </div>
          <div className='element-file-uploader'>
            <div className='row'>
              <FileInput
                className="field bp3-fill"
                ref='fileInput'
                onInputChange={(e) => this.fileChosen(e)}
                text={filePrompt}
              />
              <div className='row'>
                <Button
                  intent={Intent.SUCCESS}
                  onClick={(e) => this.submitFile(e)}
                  disabled={!this.state.hasChosenFile}
                  text='Upload File'
                />
                <div className='file-status'>
                  {
                    this.fileStatus()
                  }
                </div>
              </div>
              <div className="row">
                <Button
                  intent={Intent.SUCCESS}
                  onClick={(e) => this.submitFile(e)}
                  disabled={!this.state.fileHasUploaded}
                  text='Request Signature'
                />
              </div>
            </div>
          </div>
          {detailedView ? <p>This is the element in detailed view</p> : <p>This is the element in minimized view</p>}
          {detailedView ? <p>This is the element in detailed view</p> : null}
          {detailedView ? <p>This is the element in detailed view</p> : null}
          {detailedView ? this.uploadHistory() : null}
          {detailedView ? this.signatureHistory() : null}
        </div>
      </div>
    )
  }
}

export default Element
