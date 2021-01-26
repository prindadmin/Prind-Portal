import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Label,
} from '@blueprintjs/core'

import * as Strings from '../../../../../Data/Strings'

// TODO: Update the CSS for this box when the width is below xxx px

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
            {Strings.SIGNATURE_ELEMENT}
          </div>
        </div>
        <div className='row signatures'>
          <div className='col'>
            <Label>
              <b>{Strings.SIGNED_BY}</b>
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
              <b>{Strings.SIGNED_DATE_TIME}</b>
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
              <b>{Strings.PROOF}</b>
              {
                details.map((signature, index) => {
                  return (
                    <div key={index + "proof"}>
                      <a href={signature.proofLink} target="_blank" rel="noopener noreferrer">{Strings.LINK_TO_PROOF}</a>
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
        {Strings.NO_SIGNATURES}
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
