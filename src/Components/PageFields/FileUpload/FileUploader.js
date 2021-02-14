import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  FileInput,
  Button,
  Intent,
  Tab,
  Tabs,
} from '@blueprintjs/core'

import {
  CurrentVersion,
  UploadHistory,
  UploaderPopOver,
  SignatureHistory,
} from './subelements'

import * as Strings from '../../../Data/Strings'

// TODO: Improve propTypes so that errors are captured more easily
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
      filePrompt: Strings.FILE_PROMPT,
      fileDetails: {},
      hasChosenFile: false,
      uploadFileRequested: false,
      fileState: '',
      activeTab: 'current',
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


  currentTab = () => {
    const { elementContent, pageName, projects } = this.props
    return (
      <React.Fragment>
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
        projectID={projects.chosenProject.projectId}
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
          className="field bp3-fill"
          ref='fileInput'
          onInputChange={(e) => this.fileChosen(e)}
          text={filePrompt}
          disabled={!elementContent.editable}
        />

        <Button
          intent={Intent.PRIMARY}
          onClick={(e) => this.uploadFile(e)}
          disabled={!hasChosenFile}
          text={Strings.BUTTON_UPLOAD_FILE}
        />

      </div>
    )
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
        <Tab id="upload" title={Strings.TAB_UPLOAD_FILE} panel={this.uploadTab()} />
        <Tabs.Expander />
      </Tabs>
    )
  }


  render() {
    const { fileState, fileDetails } = this.state
    const { elementContent, pageName, projects } = this.props

    return (
      <div id='file-upload-element'>
        <div className={'file-upload-element-container' + fileState}>
          <div className='element-title'>
            {elementContent.title}
          </div>
          <div className='element-description'>
            {elementContent.description}
          </div>
          <div className='element-file-uploader container'>
            {
              this.getTabs()
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
      </div>
    )
  }
}

export default Element
