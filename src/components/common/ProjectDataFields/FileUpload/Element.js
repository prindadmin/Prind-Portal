import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  FileInput,
  Button,
  Intent,
} from '@blueprintjs/core'

import {
  CurrentVersion,
  UploadHistory,
  UploaderPopOver,
} from './subelements'


import * as strings from '../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool,
      fileDetails: PropTypes.array.isRequired,
    }),
    pageName: PropTypes.string.isRequired,
  }

  // TODO: Implement 'editable' prop.  i.e. make field locked when editable = false

  constructor() {
    super()
    this.state = {
      detailedView: false,
      filePrompt: strings.FILE_PROMPT,
      fileDetails: {},
      hasChosenFile: false,
      uploadFileRequested: false,
      fileState: '',
      hash: null,
    }
  }

  componentDidMount() {

    const { fileDetails } = this.props.elementContent

    if (fileDetails.length !== 0) {
      if (fileDetails[0].proofLink !== null) {
        this.setState({
          fileState: ' has-anchor'
        })
      }
      else {
        this.setState({
          fileState: ' has-upload'
        })
      }
    }
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

    e.persist()

    this.setState({
      filePrompt: e.target.value.replace("C:\\fakepath\\", ""),
      fileDetails: e.target,
      hasChosenFile: true,
    })
  }

  // Updates state which triggers pop-over
  uploadFile = (e) => {
    console.log("file submit clicked")

    this.setState({
      hasChosenFile: false,
      uploadFileRequested: true,
      fileState: '',
    })

    e.stopPropagation();

  }

  cancelPopup = () => {
    this.setState({
      uploadFileRequested: false,
    })
  }


  fileStatus = () => {

    var status = null

    if (this.state.hasChosenFile) {
      status = strings.FILE_READY_TO_UPLOAD
    }

    if (this.state.uploadFileRequested) {
      status = strings.FILE_UPLOADING
    }

    if (this.state.fileHasUploaded) {
      status = strings.FILE_SUCCESSFULLY_UPLOADED
    }

    if (status === null) {
      status = strings.FILE_NOT_SELECTED
    }

    return (
      <div>
        <b>Status: </b>
        {status}
      </div>
    )

  }


  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { detailedView, filePrompt, fileState, fileDetails } = this.state
    const { elementContent, pageName, projects } = this.props


    // TODO: Make the request signature a popover for searching for project members and a click to add
    // TODO: Add expand transition to make it smooth

    return (
      <div id='file-upload-element'>
        <div className={'file-upload-element-container' + fileState} onClick={(e) => this.onElementClick()}>
          <div className='element-title'>
            {elementContent.title}
          </div>
          <div className='element-description'>
            {elementContent.description}
          </div>
          <div className='element-file-uploader container'>

            <div className='row'>
              {
                elementContent.fileDetails.length > 0 ?
                <CurrentVersion
                  details={elementContent.fileDetails[0]}
                  projectID={projects.chosenProject.projectId}
                  pageName={pageName}
                  fieldID={elementContent.id}
                /> :
                <CurrentVersion
                  details={null}
                />
              }
            </div>


            <div className='row'>
              <FileInput
                className="field bp3-fill"
                ref='fileInput'
                onInputChange={(e) => this.fileChosen(e)}
                text={filePrompt}
              />


              <div className='row'>
                <div className='col-5 col-lg-4 col-xl-3'>
                  <Button
                    intent={Intent.PRIMARY}
                    onClick={(e) => this.uploadFile(e)}
                    disabled={!this.state.hasChosenFile}
                    text={strings.BUTTON_UPLOAD_FILE}
                  />
                </div>
                <div className='file-status col-auto'>
                  {
                    this.fileStatus()
                  }
                </div>
              </div>


            </div>
          </div>
          {detailedView ? <UploadHistory
            details={ elementContent.fileDetails }
            projectID={projects.chosenProject.projectId}
            pageName={pageName}
            fieldID={elementContent.id}
            /> : null}
        </div>

        {
          this.state.uploadFileRequested ?
            <UploaderPopOver
              fileDetails={ fileDetails }
              projectID={projects.chosenProject.projectId}
              pageName={pageName}
              fieldID={elementContent.id}
              onCancelPopup={ this.cancelPopup }
              /> :
            null
        }

      </div>
    )
  }
}

export default Element
