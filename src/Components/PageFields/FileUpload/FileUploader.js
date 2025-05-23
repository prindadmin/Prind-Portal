import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classes from './FileUploader.module.css'

import {
  FileInput,
  Tab,
  Tabs,
} from '@blueprintjs/core'

import {
  CurrentVersion,
  UploadHistory,
  UploaderPopOver,
  SignatureHistory,
} from './subelements'

import LoadingSpinner from '../../LoadingSpinner'

import * as Strings from '../../../Data/Strings'
import * as ComponentStates from '../ComponentStates'
import ProcoreFilePicker from '../../ProcoreFilePicker'


// TODO: FUTURE: Refactor to remove blueprintjs
// TODO: FUTURE: Fix display at mobile resolutions

export class FileUploader extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      editable: PropTypes.bool.isRequired,
      fileDetails: PropTypes.arrayOf(
        PropTypes.shape({
          uploadName: PropTypes.string.isRequired,
          uploadedBy: PropTypes.string.isRequired,
          ver: PropTypes.string.isRequired,
          uploadedDateTime: PropTypes.number.isRequired,
          proofLink: PropTypes.string,
          signatures: PropTypes.arrayOf(
            PropTypes.shape({
              signerName: PropTypes.string.isRequired,
              signatureDateTime: PropTypes.number.isRequired,
              proofLink: PropTypes.string.isRequired,
            })
          ).isRequired
        })
      ).isRequired,
    }),
    pageName: PropTypes.string.isRequired,
    projects: PropTypes.shape({
      chosenProject: PropTypes.shape({
        projectId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    uploadFile: PropTypes.func.isRequired
  }

  constructor() {
    super()
    this.state = {
      filePrompt: Strings.FILE_PROMPT,
      fileDetails: {},
      hasChosenFile: false,
      uploadFileRequested: false,
      fileState: '',
      activeTab: 'current',
      state: ComponentStates.QUIESCENT,
      procoreFilePickerOpen: false
    }
  }

  componentDidMount() {
    const { fileDetails } = this.props.elementContent
    if (fileDetails.length !== 0) {
      if (fileDetails[0].proofLink) {
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
      state: ComponentStates.UPLOADING_NEW_FILE_TO_SERVER
    })
    e.stopPropagation();
  }

  uploadProcoreFile = (e) => {
    e.stopPropagation();
    console.log("procore file submit clicked")
    this.setState({
      hasChosenFile: false,
      uploadFileRequested: false,
      fileState: '',
      state: ComponentStates.UPLOADING_NEW_FILE_TO_SERVER
    })

    const { fileDetails } = this.state
    const { projects, pageName, elementContent } = this.props

    const projectId = projects.chosenProject.projectId
    const fieldId = elementContent.id
    const uploadDetails = {
      filename: fileDetails.prostore_file.filename,
      procoreFileUrl: fileDetails.prostore_file.url
    }
    const fieldType = "file"

    console.log(uploadDetails)

    // Send to the reducer
    this.props.uploadFile(projectId, pageName, fieldId, uploadDetails, fieldType)
  }


  cancelPopup = () => {
    this.setState({
      uploadFileRequested: false,
    })
  }


  currentTab = () => {
    const { elementContent, pageName, projects } = this.props
    return (
      <React.Fragment>
        {
          elementContent.fileDetails.length > 0 ?
          <CurrentVersion
            details={elementContent.fileDetails[0]}
            projectId={projects.chosenProject.projectId}
            pageName={pageName}
            fieldID={elementContent.id}
            editable={elementContent.editable}
          /> :
          <CurrentVersion
            details={null}
            projectId={projects.chosenProject.projectId}
            pageName={pageName}
            fieldID={elementContent.id}
            editable={elementContent.editable}
          />
        }
      </React.Fragment>
    )
  }


  signatureTab = () => {
    const { elementContent } = this.props
    var details = []
    if (elementContent.fileDetails.length !== 0) {
      details = elementContent.fileDetails[0].signatures
    }
    return <SignatureHistory details={details} />
  }


  versionsTab = () => {
    const { elementContent, pageName, projects } = this.props
    return (
      <UploadHistory
        details={ elementContent.fileDetails }
        projectId={projects.chosenProject.projectId}
        pageName={pageName}
        fieldID={elementContent.id}
        />
    )
  }


  uploadTab = () => {
    const { filePrompt, hasChosenFile } = this.state
    const { elementContent } = this.props
    return (
      <div id='upload-tab-container'>
        <div className='element-title'>{Strings.TAB_UPLOAD_FILE_HEADING}</div>
        <FileInput
          id='file-input-field'
          className="field bp3-fill"
          ref='fileInput'
          onInputChange={(e) => this.fileChosen(e)}
          text={filePrompt}
          disabled={!elementContent.editable}
        />

        <input
          id="upload-button"
          className="button"
          type="submit"
          onClick={(e) => this.uploadFile(e)}
          disabled={!hasChosenFile}
          value={Strings.BUTTON_UPLOAD_FILE}
        />

      </div>
    )
  }


  uploadTabProcore = () => {
    const { hasChosenFile } = this.state
    const { elementContent } = this.props

    return (
      <div id='upload-tab-container'>
        <div className='element-title'>{Strings.TAB_UPLOAD_FILE_HEADING}</div>

        <div className={classes.uploadTabContainer} >
          {
            this.state.fileDetails.prostore_file !== undefined ?
            <input
              type="text"
              disabled={true}
              value={this.state.fileDetails.prostore_file.filename}
              /> :
              null
          }

          <div className={classes.uploadTabButtonRow} >
            <input
              id="procore-file-picker-button"
              className="button"
              type="submit"
              onClick={(e) => this.setState({ procoreFilePickerOpen: true })}
              value={Strings.BUTTON_SELECT_FILE}
            />

            <input
              id="upload-button"
              className="button"
              type="submit"
              onClick={(e) => this.uploadProcoreFile(e)}
              disabled={!hasChosenFile}
              value={Strings.BUTTON_UPLOAD_FILE}
            />
          </div>
        </div>
      </div>
    )
  }


  getProcoreFileSelectorPopover = () => {
    return <ProcoreFilePicker onFileSelected={this.fileSelected} handleClose={this.handleCloseProcoreFilePicker} />
  }

  getLatestFileVersion = (doc) => {
    // Find if of the latest version of the file uploaded
    const latestVersion = doc.file_versions.reduce(function(prev, current) {
      return (Date.parse(prev.created_at) > Date.parse(current.created_at)) ? prev : current
    })
    return latestVersion
  }


  fileSelected = (doc) => {
    console.log(doc)
    // Get latest version of the file
    const latestVersion = this.getLatestFileVersion(doc)
    // Save the latest version
    this.setState({
      fileDetails: latestVersion,
      hasChosenFile: true
    })
    // Close the File picker
    this.handleCloseProcoreFilePicker()
  }


  handleCloseProcoreFilePicker = () => {
    this.setState({
      procoreFilePickerOpen: false
    })
  }


  handleTabChange = (tabName) => {
    this.setState({
      activeTab: tabName,
    })
  }


  getTabs = () => {
    const { activeTab } = this.state
    return (
      <Tabs id='fileTabs' className="nav nav-tabs" onChange={this.handleTabChange} selectedTabId={activeTab}>
        <Tab id="current" title={Strings.TAB_CURRENT_FILE} panel={this.currentTab()} />
        <Tab id="signatures" title={Strings.TAB_SIGNATURES} panel={this.signatureTab()} />
        <Tab id="versions" title={Strings.TAB_FILE_VERSIONS} panel={this.versionsTab()} />
        <Tab id="upload" title={Strings.TAB_UPLOAD_FILE} panel={process.env.REACT_APP_IS_PROCORE === "True" ? this.uploadTabProcore() : this.uploadTab()} />
        <Tabs.Expander />
      </Tabs>
    )
  }

  render() {
    const { fileState, fileDetails } = this.state
    const { elementContent, pageName, projects } = this.props
    //console.log(this.state)
    return (
      <div id='file-upload-element'>
        <div className={'file-upload-element-container' + fileState}>
          <div className='element-title'>
            {elementContent.title}
          </div>
          <div className='element-description'>
            {elementContent.description}
          </div>
          <div className='element-file-uploader'>
            {
              this.state.state === ComponentStates.QUIESCENT ? this.getTabs() : null
            }
            {
              this.state.state === ComponentStates.UPLOADING_NEW_FILE_TO_SERVER ? <div className={classes.centerChildren}><LoadingSpinner /></div> : null
            }
          </div>
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
        {
          this.state.procoreFilePickerOpen ? this.getProcoreFileSelectorPopover() : null
        }
      </div>
    )
  }
}

export default FileUploader
