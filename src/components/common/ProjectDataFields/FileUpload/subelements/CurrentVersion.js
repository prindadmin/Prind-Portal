import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SignatureHistory from './SignatureHistory'

import * as strings from '../../../../../data/Strings'

export class Element extends Component {
  static propTypes = {
    details: PropTypes.object,
  }



  currentVersionProvided = () => {

    const { details } = this.props

    return (
      <div>

        <div className='row'>
          <div className='element-title'>
            {strings.CURRENT_VERSION_ELEMENT}
          </div>
        </div>

        <div className='row'>
          <div className='field-names col-4 col-lg-3 col-xl-2'>
            <div>{strings.FILE_NAME}</div>
            <div>{strings.UPLOAD_DATE_TIME}</div>
            <div>{strings.UPLOADED_BY}</div>
          </div>

          <div className='field-values col-auto'>
            <div>{details.uploadName}</div>
            <div>{details.uploadDateTime}</div>
            <div>{details.uploadedBy}</div>
          </div>
        </div>

        <div className='row section-margin'>
          <SignatureHistory
            details={details.signatures}
          />
        </div>
      </div>
    )
  }

  // TODO: Test this
  currentVersionNotProvided = () => {
    return (
      <div>
        {strings.NO_CURRENT_VERSION}
      </div>
    )
  }

  render() {

    const { details } = this.props

    return(
      <div className='current-version-container'>
        {
          details === null ? this.currentVersionNotProvided() : this.currentVersionProvided()
        }
      </div>


    )
  }

}

export default Element
