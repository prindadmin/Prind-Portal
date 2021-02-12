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

import ItemIcon from '../../ItemIcon'

import * as Strings from '../../../../Data/Strings'

// TODO: Stop this box expanding, contracting, then expanding again on load.
// TODO: Completely rethink how this field looks (tabs)?

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      fileDetails: PropTypes.array.isRequired,
    }),
    pageName: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      isExpanded: false,
      showUploadHistory: false,
      filePrompt: Strings.FILE_PROMPT,
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
      if (fileDetails[0].proofLink !== undefined) {
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

    const that = this

    // If the window is expanded, then...
    if (this.state.isExpanded) {
      // Delay removing the upload history
      setTimeout(() => {
        that.setState({
          showUploadHistory: !this.state.showUploadHistory,
        })
      }, 980);

      // Close the expansion straight away so the animation starts
      this.setState({
        isExpanded: !this.state.isExpanded,
      })

    // Else expand everything together
    } else {
      this.setState({
        isExpanded: !this.state.isExpanded,
        showUploadHistory: !this.state.showUploadHistory,
      })
    }

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


  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { isExpanded, showUploadHistory, filePrompt, fileState, fileDetails } = this.state
    const { elementContent, pageName, projects } = this.props

    return (
      <div id='file-upload-element' className={isExpanded ? "expanded" : "collapsed"}>
        <div className={'file-upload-element-container' + fileState}>
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
                  editable={elementContent.editable}
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
                disabled={!elementContent.editable}
              />


              <div className='row'>
                <div className='col-5 col-lg-4 col-xl-3'>
                  <Button
                    intent={Intent.PRIMARY}
                    onClick={(e) => this.uploadFile(e)}
                    disabled={!this.state.hasChosenFile}
                    text={Strings.BUTTON_UPLOAD_FILE}
                  />
                </div>
                <div className='detail-view-open-button' onClick={(e) => this.onElementClick()}>
                  {
                    isExpanded ?
                    <ItemIcon size='2x' type='caretUp' /> :
                    <ItemIcon size='2x' type='caretDown' />
                  }
                </div>
              </div>


            </div>
          </div>
          {
            showUploadHistory ? <UploadHistory
              details={ elementContent.fileDetails }
              projectID={projects.chosenProject.projectId}
              pageName={pageName}
              fieldID={elementContent.id}
              /> :
            null
          }
        </div>

        {
          this.state.uploadFileRequested ?
            <UploaderPopOver
              fileDetails={ fileDetails }
              projectID={projects.chosenProject.projectId}
              pageName={pageName}
              fieldID={elementContent.id}
              fieldType="file"
              onCancelPopup={ this.cancelPopup }
              /> :
            null
        }

      </div>
    )
  }
}

export default Element
