import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Strings from '../../../../Data/Strings'

// TODO: FUTURE: Test This
// TODO: FEATURE: Add in version number to the details mapping

export class SignatureHistory extends Component {
  static propTypes = {
    details: PropTypes.arrayOf(
      PropTypes.shape({
        signerName: PropTypes.string.isRequired,
        signatureDateTime: PropTypes.number.isRequired,
        proofLink: PropTypes.string.isRequired,
      })
    ).isRequired,
  }


  getDetailsTable = () => {
    const { details } = this.props
    return (
      <div className='details-table'>
        <h4>{Strings.SIGNED_BY}</h4>
        <h4>{Strings.SIGNED_DATE_TIME}</h4>
        <h4>{Strings.PROOF}</h4>
        {
          details.map((signature, index) => {
            const signatureDateTime = !signature.signatureDateTime ? undefined : new Date(signature.signatureDateTime * 1000)

            var endOfProofLink = ''
            try {
              endOfProofLink = signature.proofLink.split("/").slice(-1)[0]
            } catch (err) {
              console.warn(`proofLink not available for signature by ${signature.signerName} on ${signatureDateTime.toDateString()}`)
            }

            const entryHash = endOfProofLink.replace("entry?hash=", "")

            return (
              <React.Fragment key={index}>
                <div key={`signer-${index}`}>{signature.signerName}</div>
                <div key={`signatureDateTime-${index}`}>{!signatureDateTime ? Strings.ERROR_DATE_UNAVAILABLE : signatureDateTime.toLocaleString()}</div>
                {
                  entryHash !== '' ?
                  <div key={`proofLink-${index}`}><a href={`${process.env.REACT_APP_FACTOM_EXPLORER_SITE}/entries/${entryHash}`} target="_blank" rel="noopener noreferrer">{Strings.LINK_TO_PROOF}</a></div> :
                  <div>{Strings.NO_HASH_AVAILABLE}</div>
                }
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }


  signaturesProvided = () => {
    return (
      <React.Fragment>
        {
          this.getDetailsTable()
        }
      </React.Fragment>
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
      <div id='signature-container'>
        <div className='element-title'>
          {Strings.SIGNATURE_ELEMENT}
        </div>
        {
          details.length === 0 ? this.signaturesNotProvided() : this.signaturesProvided()
        }
      </div>
    )
  }

}

export default SignatureHistory
