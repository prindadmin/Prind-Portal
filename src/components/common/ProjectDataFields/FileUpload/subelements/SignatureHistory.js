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



  signaturesProvided = () => {

    const { details } = this.props

    return (
      <div>

        <div className='row'>
          <div className='element-title'>
            {strings.SIGNATURE_ELEMENT}
          </div>
        </div>
        <div className='row signatures'>
          <div className='col'>
            <Label>
              <b>{strings.SIGNED_BY}</b>
              {
                details.map((signature, index) => {
                  return (
                    <div key={index + "signee"}>
                      {signature.signerName}
                    </div>
                  )
                })
              }
            </Label>
          </div>
          <div className='col'>
            <Label>
              <b>{strings.SIGNED_DATE_TIME}</b>
              {
                details.map((signature, index) => {
                  return (
                    <div key={index + "datetime"}>
                      {signature.signatureDateTime}
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
                details.map((signature, index) => {
                  return (
                    <div key={index + "proof"}>
                      <a href={signature.proofLink} target="_blank" rel="noopener noreferrer">{strings.LINK_TO_PROOF}</a>
                    </div>
                  )
                })
              }
            </Label>
          </div>
        </div>
      </div>
    )
  }

  signaturesNotProvided = () => {
    return (
      <div>
        {strings.NO_SIGNATURES}
      </div>
    )
  }

  render() {

    const { details } = this.props

    return(
      <div className='signature-container'>
        {
          details === null ? this.signaturesNotProvided() : this.signaturesProvided()
        }
      </div>
    )
  }

}

export default Element
