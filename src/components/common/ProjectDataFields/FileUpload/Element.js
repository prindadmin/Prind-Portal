import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  FileInput,
  Button,
  Label,
  Intent,
  InputGroup,
} from '@blueprintjs/core'

import {
  CurrentVersion,
  UploadHistory,
} from './subelements'


import * as strings from '../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    elementContent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      fileDetails: PropTypes.array.isRequired,
    }),
    pageName: PropTypes.string.isRequired,
  }

  // TODO: Implement 'editable' prop.  i.e. make field locked when editable = false
  // TODO: Create functionality to say file has uploaded successfully
  // TODO: Create functionality to calculate the hash of the file
  // TODO: Implement calls to server

  constructor() {
    super()
    this.state = {
      detailedView: false,
      filePrompt: strings.FILE_PROMPT,
      hasChosenFile: false,
      uploadFileRequsted: false,
      fileHasUploaded: false,
      fileHasAnchor: false,
      fileState: '',
      hash: null,
    }
  }

  componentDidMount() {
    //console.log(this.props.elementContent)

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
    this.setState({
      filePrompt: e.target.value.replace("C:\\fakepath\\", ""),
      hasChosenFile: true,
    })
  }

  // TODO: Perform actions to upload file
  uploadFile = (e) => {
    console.log("file submit clicked")

    // TODO: Upload the file to S3
    const fileName = "this will be a filename.txt"

    this.props.uploadFile(
      this.props.auth.info.idToken.jwtToken,
      this.props.pageName,
      fileName,
    )

    this.setState({
      hasChosenFile: false,
      uploadFileRequsted: true,
      fileState: '',
    })

    e.stopPropagation();

  }

  // TODO: Perform actions to requst a signature
  sendSelfSignRequest = (e) => {
    console.log("Self sign file clicked")
  }

  // TODO: Perform actions to requst a signature
  requestSignature = (e) => {
    console.log("signature requested")
    e.stopPropagation();
  }


  onFileUploadSuccess = () => {
    this.setState({
      fileHasUploaded: true,
      fileState: ' has-upload',
    })
  }

  onFileAnchorSuccess = () => {
    this.setState({
      fileHasAnchor: true,
      fileState: ' has-anchor',
    })
  }

  uploadHistory = () => {
    return (
      <div className='upload-history'>
        <Label>
           Upload history
           <InputGroup
            id="upload-history"
            placeholder="This will be the file's upload history"
          />
        </Label>
      </div>
    )
  }

  signatureHistory = () => {
    return (
      <div className='signature-history'>
        <Label>
           Signature history
           <InputGroup
            id="signature-history"
            placeholder="This will be the file's signature history"
          />
        </Label>
      </div>
    )
  }

  fileStatus = () => {

    var status = null

    if (this.state.hasChosenFile) {
      status = strings.FILE_READY_TO_UPLOAD
    }

    if (this.state.uploadFileRequsted) {
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

  hashStatus = () => {

    const { hash } = this.state

    var status = strings.NO_HASH_YET

    if (hash !== null) {
      status = hash
    }

    return (
      <div>
        <b>Hash: </b>
        {status}
      </div>
    )

  }

  // ------------------------------ RENDER BELOW THIS LINE ------------------------------

  render() {

    const { detailedView, filePrompt, fileHasUploaded, fileHasAnchor, fileState } = this.state
    const { elementContent } = this.props


    // TODO: Make the request signature a field for searching for project members and a click to add
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


              <div className="row">
                <div className='col-5 col-lg-4 col-xl-3'>
                  <Button
                    intent={Intent.PRIMARY}
                    onClick={(e) => this.sendSelfSignRequest(e)}
                    disabled={!this.state.fileHasUploaded}
                    text={strings.BUTTON_SELF_SIGN_FILE}
                  />
                </div>
                <div className='col-auto'>
                  {
                    this.hashStatus()
                  }
                </div>
              </div>


              <div className="row">
                <div className='col-5 col-lg-4 col-xl-3'>
                  <Button
                    intent={Intent.PRIMARY}
                    onClick={(e) => this.requestSignature(e)}
                    disabled={!this.state.fileHasUploaded}
                    text={strings.BUTTON_REQUEST_SIGNATURE}
                  />
                </div>
              </div>


            </div>
          </div>
          {detailedView ? <UploadHistory details={elementContent.fileDetails}/> : null}
        </div>
      </div>
    )
  }
}

export default Element
