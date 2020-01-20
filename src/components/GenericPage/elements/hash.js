import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@blueprintjs/core'

import ContactUsDispatch from '../../../dispatchers/foundations/notify'

export class Hash extends Component {
  static propTypes = {
    id: PropTypes.number,
    hashValue: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      requestedSignature: false,
    }
  }

  notify = (e) => {
    // Once the user clicks the notify button, send Imanuel a notification
    this.setState({
      requestedSignature: true
    })

    this.props.signatureListener(this.props.id)
    ContactUsDispatch({requestID: this.props.hashValue})
  }


  render(){

    const text = "The file hash is: "

    return(
      <div className='hash-section'>
        <div className='hash-text'>
          <b><h3>{text}</h3></b>
          <span>{this.props.hashValue}</span>
          <label className="bp3-fill bp3-file-input button col-md-3 col-margin">
            <Button
              className='submit-button bp3-intent-primary'
              ref='submitButton'
              onClick={(e) => this.notify(e)}
              text='Request Signature'
            />
          </label>
        </div>
      </div>
    )
  }

}

export default Hash
