import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Label,
} from '@blueprintjs/core'

import * as strings from '../../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    details: PropTypes.array.isRequired,
  }

  openProof = (e) => {
    e.stopPropagation()
  }

  // TODO: Add popover when clicking filename that opens with lots of details
  // TODO: Make scrollable after a certain max height

  uploadHistoryProvided = () => {

    var { details } = this.props

    details = details.reverse().filter(function(fileUpload) {
      return(fileUpload.ver !== 0)
    })

    return (
      <div>

        <div className='row'>
          <div className='element-title'>
            {strings.UPLOAD_HISTORY_ELEMENT}
          </div>
        </div>
        <div className='row signatures'>

          <div className='col'>
            <Label>
              <b>{strings.FILE_NAME}</b>
              {
                details.map((fileUpload, index) => {
                  return (
                    <div key={index}>
                      {fileUpload.uploadName}
                    </div>
                  )
                })
              }
            </Label>
          </div>

          <div className='col'>
            <Label>
              <b>{strings.UPLOADED_BY}</b>
              {
                details.map((fileUpload, index) => {
                  return (
                    <div key={index}>
                      {fileUpload.uploadedBy}
                    </div>
                  )
                })
              }
            </Label>
          </div>

          <div className='col'>
            <Label>
              <b>{strings.UPLOAD_DATE_TIME}</b>
              {
                details.map((fileUpload, index) => {
                  return (
                    <div key={index}>
                      {fileUpload.uploadDateTime}
                    </div>
                  )
                })
              }
            </Label>
          </div>

          <div className='col'>
            <Label>
              <b>{strings.PROOF}</b>
              {
                details.map((fileUpload, index) => {
                  if (details.proofLink === undefined) {
                    return (
                      <div key={index}>
                        {strings.NO_PROOF_AVAILABLE}
                      </div>
                    )
                  } else {
                    return (
                      <div key={index}>
                        <a onClick={e => this.openProof(e)} href={fileUpload.proofLink}>{strings.LINK_TO_PROOF}</a>
                      </div>
                    )
                  }
                })
              }
            </Label>
          </div>
        </div>
      </div>
    )
  }

  uploadHistoryNotProvided = () => {
    return (
      <div>
        {strings.NO_PREVIOUS_VERSIONS}
      </div>
    )
  }



  render() {

    const { details } = this.props

    return(
      <div className='current-version-container'>
        {
          details === null ? this.uploadHistoryNotProvided() : this.uploadHistoryProvided()
        }
      </div>
    )
  }

}

export default Element
