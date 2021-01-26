import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Label,
} from '@blueprintjs/core'

import FileDetailPopover from './FileDetailPopover'

import * as Strings from '../../../../../Data/Strings'

export class Element extends Component {
  static propTypes = {
    details: PropTypes.array.isRequired,
    projectID: PropTypes.any.isRequired,
    pageName: PropTypes.any.isRequired,
    fieldID: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      showFileDetails: false,
      fileDetails: {}
    }
  }

  fileDetailsOpen = (e, fileDetails) => {
    this.setState({
      showFileDetails: true,
      chosenFileDetails: fileDetails,
    })
    e.stopPropagation()
  }

  closeFileDetails = () => {
    this.setState({
      showFileDetails: false,
      fileDetails: {}
    })
  }


  openProof = (e) => {
    e.stopPropagation()
  }



  getProof = (proofLink) => {

    if (proofLink === undefined) {
      return(
        Strings.NO_PROOF_AVAILABLE
      )
    } else {
      return(
        <a target="_blank" rel="noopener noreferrer" onClick={e => this.openProof(e)} href={proofLink}>{Strings.LINK_TO_PROOF}</a>
      )
    }
  }


  uploadHistoryProvided = () => {

    const  { details } = this.props

    var reversedDetails = details.filter(function(fileUpload) {
      return(fileUpload.ver !== "0" && fileUpload.ver !== 0)
    })

    reversedDetails.reverse()

    return (
      <React.Fragment>

        <div className='row'>
          <div className='element-title'>
            {Strings.UPLOAD_HISTORY_ELEMENT}
          </div>
        </div>


        <div className='row'>

          <div className='col'>
            <Label>
              <b>{Strings.FILE_NAME}</b>
            </Label>
          </div>

          <div className='col'>
            <Label>
              <b>{Strings.UPLOADED_BY}</b>
            </Label>
          </div>

          <div className='col'>
            <Label>
              <b>{Strings.UPLOAD_VERSION}</b>
            </Label>
          </div>

          <div className='col'>
            <Label>
              <b>{Strings.UPLOAD_DATE_TIME}</b>
            </Label>
          </div>

          <div className='col'>
            <Label>
              <b>{Strings.PROOF}</b>
            </Label>
          </div>

        </div>

        <div className='row'>
        {
          reversedDetails.map((fileUpload, index) => {
            return (
              <div className='row signatures' key={index} onClick={(e) => this.fileDetailsOpen(e, fileUpload)}>

                <div className='col'>
                  {fileUpload.uploadName === undefined ? Strings.NO_UPLOAD_NAME : fileUpload.uploadName}
                </div>

                <div className='col'>
                  {fileUpload.uploadedBy}
                </div>

                <div className='col'>
                  {fileUpload.ver}
                </div>

                <div className='col'>
                  {fileUpload.uploadedDateTime}
                </div>

                <div className='col'>
                  {
                    this.getProof(fileUpload.proofLink)
                  }
                </div>

              </div>
            )
          })
        }
        </div>
      </React.Fragment>
    )
  }


  uploadHistoryNotProvided = () => {
    return (
      <div>
        {Strings.NO_PREVIOUS_VERSIONS}
      </div>
    )
  }



  render() {

    const { details, projectID, pageName, fieldID } = this.props
    const { showFileDetails, chosenFileDetails } = this.state

    return(
      <div className='upload-history-container'>
        {
          details.length === 0 ? this.uploadHistoryNotProvided() : this.uploadHistoryProvided()
        }
        {
          showFileDetails ?
          <FileDetailPopover
            chosenFileDetails={chosenFileDetails}
            projectID={projectID}
            pageName={pageName}
            fieldID={fieldID}
            onClosePopover={this.closeFileDetails}
          /> :
          null
        }
      </div>
    )
  }

}

export default Element
